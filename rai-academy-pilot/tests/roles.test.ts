import { describe, expect, it } from "vitest";
import { homePathForRole, isRole } from "@/lib/roles";

describe("roles", () => {
  it("routes each role to its home", () => {
    expect(homePathForRole("admin")).toBe("/admin");
    expect(homePathForRole("sponsor")).toBe("/sponsor");
    expect(homePathForRole("participant")).toBe("/participant");
    expect(homePathForRole(null)).toBe("/login");
  });

  it("recognises only known roles", () => {
    expect(isRole("admin")).toBe(true);
    expect(isRole("superuser")).toBe(false);
    expect(isRole(undefined)).toBe(false);
  });
});
