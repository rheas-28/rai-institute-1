// One-page Self-Check snapshot PDF, set in Roboto.
import { readFile } from "node:fs/promises";
import path from "node:path";
import fontkit from "@pdf-lib/fontkit";
import { PDFDocument, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { Snapshot } from "./snapshot";

export const SNAPSHOT_STATEMENT = "Self-reported; not an assessment.";
const MAX_ROWS = 14;
const FONT_DIR = path.join(process.cwd(), "assets", "fonts");

const INK = rgb(0.1, 0.1, 0.12);
const MUTED = rgb(0.38, 0.38, 0.42);
const BRAND = rgb(0.09, 0.2, 0.4);
const LINE = rgb(0.85, 0.85, 0.88);
const HEAT = { 1: rgb(0.2, 0.55, 0.3), 2: rgb(0.8, 0.5, 0.05), 3: rgb(0.75, 0.15, 0.15) } as const;

export type PdfMeta = { orgName: string; teamLabel: string; round: "baseline" | "readout"; date: Date };

// Drop characters Roboto can't draw (emoji, control characters).
function clean(text: string): string {
  return text.replace(/[^\u0020-\u024F\u0370-\u03FF\u0400-\u04FF\u2010-\u2027\u20AC]/g, "").trim();
}

function fit(text: string, font: PDFFont, size: number, width: number): string {
  let t = clean(text);
  if (font.widthOfTextAtSize(t, size) <= width) return t;
  while (t && font.widthOfTextAtSize(`${t}…`, size) > width) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

function wrap(text: string, font: PDFFont, size: number, width: number, maxLines: number): string[] {
  const lines: string[] = [];
  let current = "";
  for (const word of clean(text).split(/\s+/)) {
    const next = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(next, size) <= width) current = next;
    else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = fit(`${lines[maxLines - 1]} …`, font, size, width);
  }
  return lines.map((l) => fit(l, font, size, width));
}

export async function renderSnapshotPdf(snapshot: Snapshot, meta: PdfMeta): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  const [regularBytes, boldBytes] = await Promise.all([
    readFile(path.join(FONT_DIR, "Roboto-Regular.ttf")),
    readFile(path.join(FONT_DIR, "Roboto-Bold.ttf")),
  ]);
  const regular = await doc.embedFont(regularBytes, { subset: true });
  const bold = await doc.embedFont(boldBytes, { subset: true });
  doc.setTitle("Shadow AI Self-Check snapshot");
  doc.setProducer("RAI Academy Pilot");

  const page: PDFPage = doc.addPage([595.28, 841.89]); // A4
  const left = 48;
  const width = page.getWidth() - left * 2;
  let y = page.getHeight() - 56;

  const text = (t: string, x: number, size: number, font = regular, color = INK) =>
    page.drawText(t, { x, y, size, font, color });

  text("Shadow AI Self-Check snapshot", left, 20, bold, BRAND);
  y -= 20;
  const round = meta.round === "baseline" ? "Baseline" : "Readout";
  const date = meta.date.toISOString().slice(0, 10);
  text(fit(`${meta.orgName} · Team: ${meta.teamLabel} · ${round} · ${date}`, regular, 10, width), left, 10, regular, MUTED);
  y -= 22;
  page.drawRectangle({ x: left, y: y - 6, width, height: 22, color: rgb(0.95, 0.96, 0.98), borderColor: LINE, borderWidth: 1 });
  text(SNAPSHOT_STATEMENT, left + 8, 11, bold);
  y -= 34;

  text("AI inventory", left, 13, bold, BRAND);
  y -= 18;
  const cols = [
    { label: "Tool", x: left, w: 170 },
    { label: "Sanctioned", x: left + 175, w: 60 },
    { label: "Acts on its own", x: left + 240, w: 75 },
    { label: "Approved by", x: left + 320, w: 130 },
    { label: "Heat", x: left + 455, w: 44 },
  ];
  for (const c of cols) text(c.label, c.x, 9, bold, MUTED);
  y -= 6;
  page.drawLine({ start: { x: left, y }, end: { x: left + width, y }, color: LINE, thickness: 1 });
  y -= 13;

  const items = [...snapshot.inventory].sort((a, b) => b.heat - a.heat);
  if (!items.length) {
    text("No AI tools were reported.", left, 10, regular, MUTED);
    y -= 15;
  }
  for (const item of items.slice(0, MAX_ROWS)) {
    text(fit(item.tool, regular, 9.5, cols[0].w), cols[0].x, 9.5);
    text(item.sanctioned, cols[1].x, 9.5);
    text(item.acts_on_its_own, cols[2].x, 9.5);
    text(fit(item.approved_by || "No one named", regular, 9.5, cols[3].w), cols[3].x, 9.5, regular, item.approved_by ? INK : MUTED);
    text(String(item.heat), cols[4].x, 9.5, bold, HEAT[item.heat]);
    y -= 11;
    text(fit(`${item.purpose ? `${item.purpose} · ` : ""}Data: ${item.data_types.join(", ") || "not stated"}`, regular, 8, width), left, 8, regular, MUTED);
    y -= 15;
  }
  if (items.length > MAX_ROWS) {
    text(`+ ${items.length - MAX_ROWS} more lower-listed tools not shown`, left, 9, regular, MUTED);
    y -= 15;
  }
  text("Heat is the highest of four 1–3 scores: data sensitivity, autonomy, impact on people, oversight gap.", left, 8, regular, MUTED);
  y -= 26;

  for (const [title, list] of [["Top gaps", snapshot.top_gaps], ["Next actions", snapshot.next_actions]] as const) {
    text(title, left, 13, bold, BRAND);
    y -= 17;
    list.forEach((entry, i) => {
      wrap(entry, regular, 10, width - 16, 2).forEach((l, j) => {
        if (j === 0) text(`${i + 1}.`, left, 10, bold);
        text(l, left + 16, 10);
        y -= 13;
      });
      y -= 3;
    });
    y -= 12;
  }

  page.drawText(`${SNAPSHOT_STATEMENT} Anonymous team responses, not checked by RAI.`, {
    x: left, y: 36, size: 8, font: regular, color: MUTED,
  });
  return doc.save();
}
