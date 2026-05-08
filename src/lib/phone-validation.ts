const PHONE_ALLOWED_CHARS_REGEX = /^[0-9+\s()-]+$/;
const PHONE_DIGITS_REGEX = /\d/g;
const PHONE_MAX_LENGTH = 32;
const PHONE_MIN_DIGITS = 6;
const PHONE_MAX_DIGITS = 15;

export function normalizePhone(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
}

export function sanitizePhoneInput(value: string): string {
  // Keep only characters commonly used for phone formatting.
  const onlyAllowed = value.replace(/[^0-9+\s()-]/g, "");
  // Allow "+" only at the beginning.
  const withSingleLeadingPlus = onlyAllowed
    .replace(/\+/g, "")
    .replace(/^/, onlyAllowed.trimStart().startsWith("+") ? "+" : "");

  return withSingleLeadingPlus.replace(/\s+/g, " ").slice(0, PHONE_MAX_LENGTH);
}

export function isValidPhone(value: unknown): boolean {
  const phone = normalizePhone(value);
  if (!phone) return false;
  if (phone.length > PHONE_MAX_LENGTH) return false;
  if (!PHONE_ALLOWED_CHARS_REGEX.test(phone)) return false;

  const plusCount = (phone.match(/\+/g) ?? []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && !phone.startsWith("+")) return false;

  const digits = phone.match(PHONE_DIGITS_REGEX)?.length ?? 0;
  if (digits < PHONE_MIN_DIGITS || digits > PHONE_MAX_DIGITS) return false;

  return true;
}
