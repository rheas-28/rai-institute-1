export const ROLES = ["admin", "sponsor", "participant"] as const;
export type Role = (typeof ROLES)[number];

export const LAYERS = ["board", "leader", "risk", "builder", "advisor"] as const;
export type Layer = (typeof LAYERS)[number];

export function homePathForRole(role: Role | null | undefined): string {
  switch (role) {
    case "admin":
      return "/admin";
    case "sponsor":
      return "/sponsor";
    case "participant":
      return "/participant";
    default:
      return "/login";
  }
}

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && (ROLES as readonly string[]).includes(value);
}
