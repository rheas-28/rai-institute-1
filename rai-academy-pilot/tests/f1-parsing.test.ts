import JSZip from "jszip";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { ACCESS_CODE_PATTERN, generateAccessCode } from "@/lib/access-code";
import { clientPackSchema, readClientPackForm } from "@/lib/client-pack";
import { checkParticipantsCsv } from "@/lib/participants-csv";
import { extractPolicyText, PolicyFileError } from "@/lib/policy-text";

async function makePdf(lines: string[]): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const page = doc.addPage();
  lines.forEach((line, i) => page.drawText(line, { x: 50, y: 750 - i * 20, size: 12, font }));
  return doc.save();
}

async function makeDocx(paragraphs: string[]): Promise<Uint8Array> {
  const zip = new JSZip();
  zip.file(
    "[Content_Types].xml",
    `<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`
  );
  zip.file(
    "_rels/.rels",
    `<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`
  );
  const body = paragraphs.map((p) => `<w:p><w:r><w:t>${p}</w:t></w:r></w:p>`).join("");
  zip.file(
    "word/document.xml",
    `<?xml version="1.0" encoding="UTF-8"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${body}</w:body></w:document>`
  );
  return zip.generateAsync({ type: "uint8array" });
}

describe("access codes", () => {
  it("look like XXXX-XXXX with no ambiguous characters", () => {
    const codes = Array.from({ length: 500 }, generateAccessCode);
    codes.forEach((c) => expect(c).toMatch(ACCESS_CODE_PATTERN));
    expect(codes.join("")).not.toMatch(/[01OIL]/);
    expect(new Set(codes).size).toBeGreaterThan(495);
  });
});

describe("policy text extraction", () => {
  it("reads PDF", async () => {
    const text = await extractPolicyText("policy.pdf", await makePdf(["Acceptable use of AI", "Do not paste client data."]));
    expect(text).toContain("Acceptable use of AI");
    expect(text).toContain("Do not paste client data.");
  });

  it("reads DOCX", async () => {
    const text = await extractPolicyText("policy.docx", await makeDocx(["AI policy", "Use approved tools only."]));
    expect(text).toContain("AI policy");
    expect(text).toContain("Use approved tools only.");
  });

  it("reads Markdown and normalises line endings", async () => {
    const md = new TextEncoder().encode("# Policy\r\n\r\n\r\n\r\nRule one.  \r\n");
    expect(await extractPolicyText("policy.md", md)).toBe("# Policy\n\nRule one.");
  });

  it("rejects other types, renamed files, empty and image-only PDFs", async () => {
    const md = new TextEncoder().encode("hello");
    await expect(extractPolicyText("policy.exe", md)).rejects.toThrow(PolicyFileError);
    await expect(extractPolicyText("policy.pdf", md)).rejects.toThrow(/PDF, DOCX or Markdown/);
    await expect(extractPolicyText("policy.md", new Uint8Array())).rejects.toThrow(/empty/);
    await expect(extractPolicyText("scan.pdf", await makePdf([]))).rejects.toThrow(/No text found/);
  });

  it("rejects files over 10 MB", async () => {
    await expect(extractPolicyText("big.md", new Uint8Array(10 * 1024 * 1024 + 1))).rejects.toThrow(/10 MB/);
  });
});

describe("participant CSV", () => {
  it("accepts valid rows and normalises them", () => {
    const { fileErrors, rows } = checkParticipantsCsv(
      "\uFEFFEmail,Name,Layer,Role Title\r\n ANA@Example.com ,Ana Ruiz,Risk,Model risk lead\nbo@example.com,Bo Li,builder,\n\n"
    );
    expect(fileErrors).toEqual([]);
    expect(rows.map((r) => r.row)).toEqual([
      { email: "ana@example.com", name: "Ana Ruiz", layer: "risk", role_title: "Model risk lead" },
      { email: "bo@example.com", name: "Bo Li", layer: "builder", role_title: null },
    ]);
  });

  it("reports errors per row with the file's line number", () => {
    const { rows } = checkParticipantsCsv(
      [
        "email,name,layer,role_title",
        "ok@example.com,Ok,leader,Head",
        "not-an-email,Bad Email,leader,",
        "nolayer@example.com,No Layer,,",
        "wrong@example.com,Wrong Layer,ceo,",
        "OK@example.com,Dup,board,",
        "noname@example.com,,advisor,",
      ].join("\n")
    );
    const byLine = Object.fromEntries(rows.map((r) => [r.line, r.errors]));
    expect(byLine[2]).toEqual([]);
    expect(byLine[3]).toEqual(["Email is not valid"]);
    expect(byLine[4]).toEqual(["Layer is missing"]);
    expect(byLine[5][0]).toMatch(/Layer must be one of: board, leader, risk, builder, advisor/);
    expect(byLine[6]).toEqual(["Duplicate of line 2"]);
    expect(byLine[7]).toEqual(["Name is missing"]);
    expect(rows.filter((r) => r.row)).toHaveLength(1);
  });

  it("rejects files with missing columns or no rows", () => {
    expect(checkParticipantsCsv("email,name\na@b.co,A").fileErrors[0]).toMatch(/Missing columns: layer, role_title/);
    expect(checkParticipantsCsv("email,name,layer,role_title\n").fileErrors).toEqual(["The file has no participant rows."]);
    expect(checkParticipantsCsv("").fileErrors.length).toBe(1);
  });
});

describe("client pack form", () => {
  it("reads tool rows, drops blank rows and validates", () => {
    const form = new FormData();
    form.set("policy_text", "  Policy  ");
    for (const [n, v, u] of [["Copilot", "Microsoft", "Drafting"], ["", "", ""], ["Claude", "", ""]]) {
      form.append("tool_name", n);
      form.append("tool_vendor", v);
      form.append("tool_uses", u);
    }
    form.set("use_case_name", "Client letters");
    const parsed = clientPackSchema.parse(readClientPackForm(form));
    expect(parsed.policy_text).toBe("Policy");
    expect(parsed.approved_tools).toEqual([
      { name: "Copilot", vendor: "Microsoft", approved_uses: "Drafting" },
      { name: "Claude", vendor: "", approved_uses: "" },
    ]);
    expect(parsed.shared_use_case.name).toBe("Client letters");
  });

  it("requires policy text and a name for every tool", () => {
    const form = new FormData();
    form.append("tool_name", "");
    form.append("tool_vendor", "Acme");
    form.append("tool_uses", "");
    const result = clientPackSchema.safeParse(readClientPackForm(form));
    expect(result.success).toBe(false);
    expect(result.error?.issues.map((i) => i.message)).toEqual(
      expect.arrayContaining(["The policy text is empty", "Every tool needs a name"])
    );
  });
});
