const STRICT_EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const ASCII_ONLY_REGEX = /^[\x00-\x7F]+$/;

function hasInvalidLocalPart(localPart: string): boolean {
  if (!localPart) return true;
  if (localPart.startsWith(".") || localPart.endsWith(".")) return true;
  if (localPart.includes("..")) return true;
  return false;
}

function hasInvalidDomain(domain: string): boolean {
  if (!domain || !domain.includes(".")) return true;
  if (domain.includes("..")) return true;

  const labels = domain.split(".");
  if (labels.length < 2) return true;

  return labels.some((label) => {
    if (!label) return true;
    if (label.startsWith("-") || label.endsWith("-")) return true;
    return !/^[A-Za-z0-9-]+$/.test(label);
  });
}

export function normalizeEmail(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isValidEmail(value: unknown): boolean {
  const email = normalizeEmail(value);
  if (!email) return false;
  if (!ASCII_ONLY_REGEX.test(email)) return false;
  if (/\s/.test(email)) return false;
  if (!STRICT_EMAIL_REGEX.test(email)) return false;

  const [localPart = "", domain = ""] = email.split("@");
  if (hasInvalidLocalPart(localPart)) return false;
  if (hasInvalidDomain(domain)) return false;

  return true;
}

