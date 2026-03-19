export const COOKIE_CONSENT_STORAGE_KEY = "enblanco-cookie-consent";
export const COOKIE_CONSENT_VERSION = 1;

export type CookieConsentState = {
  version: number;
  updatedAt: string;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export const DEFAULT_COOKIE_CONSENT: CookieConsentState = {
  version: COOKIE_CONSENT_VERSION,
  updatedAt: "",
  necessary: true,
  analytics: false,
  marketing: false,
};

export function isCookieConsentState(value: unknown): value is CookieConsentState {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.version === COOKIE_CONSENT_VERSION &&
    candidate.necessary === true &&
    typeof candidate.updatedAt === "string" &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.marketing === "boolean"
  );
}

export function readCookieConsent(raw: string | null): CookieConsentState | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return isCookieConsentState(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function createCookieConsent(
  values: Pick<CookieConsentState, "analytics" | "marketing">
): CookieConsentState {
  return {
    version: COOKIE_CONSENT_VERSION,
    updatedAt: new Date().toISOString(),
    necessary: true,
    analytics: values.analytics,
    marketing: values.marketing,
  };
}
