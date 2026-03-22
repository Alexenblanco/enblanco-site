"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import {
  COOKIE_CONSENT_STORAGE_KEY,
  DEFAULT_COOKIE_CONSENT,
  createCookieConsent,
  readCookieConsent,
  type CookieConsentState,
} from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

type Locale = "es" | "en";

const COPY: Record<
  Locale,
  {
    title: string;
    body: string;
    acceptAll: string;
    reject: string;
    configure: string;
    save: string;
    analytics: string;
    marketing: string;
    necessary: string;
  }
> = {
  es: {
    title: "Cookies",
    body:
      "Utilizamos cookies necesarias y, si lo aceptas, también cookies analíticas y de marketing para medir y mejorar la web.",
    acceptAll: "Aceptar todas",
    reject: "Rechazar no necesarias",
    configure: "Configurar",
    save: "Guardar preferencias",
    analytics: "Analíticas",
    marketing: "Marketing",
    necessary: "Necesarias",
  },
  en: {
    title: "Cookies",
    body:
      "We use necessary cookies and, if you agree, analytics and marketing cookies to measure and improve the website.",
    acceptAll: "Accept all",
    reject: "Reject non-essential",
    configure: "Configure",
    save: "Save preferences",
    analytics: "Analytics",
    marketing: "Marketing",
    necessary: "Necessary",
  },
};

function subscribeToCookieConsent(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === COOKIE_CONSENT_STORAGE_KEY) onStoreChange();
  };
  const handleCustom = () => onStoreChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener("enblanco:cookie-consent-change", handleCustom);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener("enblanco:cookie-consent-change", handleCustom);
  };
}

function getCookieConsentSnapshot() {
  return window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
}

export default function CookieConsentManager() {
  const pathname = usePathname() ?? "";
  const locale: Locale = pathname.startsWith("/en") ? "en" : "es";
  const consentRaw = useSyncExternalStore(
    subscribeToCookieConsent,
    getCookieConsentSnapshot,
    () => null
  );
  const consent = useMemo(() => readCookieConsent(consentRaw), [consentRaw]);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [draft, setDraft] = useState(() => ({
    analytics: DEFAULT_COOKIE_CONSENT.analytics,
    marketing: DEFAULT_COOKIE_CONSENT.marketing,
  }));

  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    const handleOpen = () => {
      setDraft({
        analytics: consent?.analytics ?? DEFAULT_COOKIE_CONSENT.analytics,
        marketing: consent?.marketing ?? DEFAULT_COOKIE_CONSENT.marketing,
      });
      setIsConfigOpen(true);
    };
    window.addEventListener("enblanco:open-cookie-preferences", handleOpen);
    return () => {
      window.removeEventListener("enblanco:open-cookie-preferences", handleOpen);
    };
  }, [consent]);

  useEffect(() => {
    document.documentElement.dataset.cookieConsentState = consent ? "set" : "unset";
    document.documentElement.dataset.cookieAnalytics =
      consent?.analytics ? "granted" : "denied";
    document.documentElement.dataset.cookieMarketing =
      consent?.marketing ? "granted" : "denied";

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        analytics_storage: consent?.analytics ? "granted" : "denied",
        ad_storage: consent?.marketing ? "granted" : "denied",
        ad_user_data: consent?.marketing ? "granted" : "denied",
        ad_personalization: consent?.marketing ? "granted" : "denied",
      });
    }

    if (typeof window.fbq === "function") {
      window.fbq("consent", consent?.marketing ? "grant" : "revoke");
    }
  }, [consent]);

  const copy = COPY[locale];

  const saveConsent = (next: CookieConsentState) => {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("enblanco:cookie-consent-change"));
    setDraft({ analytics: next.analytics, marketing: next.marketing });
    setIsConfigOpen(false);
  };

  const shouldLoadGtm = Boolean(gtmId && consent && (consent.analytics || consent.marketing));
  const shouldLoadGa4 = Boolean(!gtmId && ga4Id && consent?.analytics);
  const shouldLoadMeta = Boolean(!gtmId && metaPixelId && consent?.marketing);

  const consentScript = useMemo(
    () =>
      consent
        ? `window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:"enblanco_cookie_consent",analytics_storage:"${
            consent.analytics ? "granted" : "denied"
          }",ad_storage:"${consent.marketing ? "granted" : "denied"}",ad_user_data:"${
            consent.marketing ? "granted" : "denied"
          }",ad_personalization:"${consent.marketing ? "granted" : "denied"}"});`
        : "",
    [consent]
  );

  return (
    <>
      {consent && consentScript ? (
        <Script id="enblanco-consent-state" strategy="afterInteractive">
          {consentScript}
        </Script>
      ) : null}

      {shouldLoadGtm ? (
        <Script id="enblanco-gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}</Script>
      ) : null}

      {shouldLoadGa4 ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="enblanco-ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('consent', 'default', {
              analytics_storage: '${consent?.analytics ? "granted" : "denied"}',
              ad_storage: '${consent?.marketing ? "granted" : "denied"}',
              ad_user_data: '${consent?.marketing ? "granted" : "denied"}',
              ad_personalization: '${consent?.marketing ? "granted" : "denied"}'
            });
            gtag('config', '${ga4Id}');
          `}</Script>
        </>
      ) : null}

      {shouldLoadMeta ? (
        <Script id="enblanco-meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('consent', 'grant');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `}</Script>
      ) : null}

      {!consent ? (
        <div className="fixed inset-x-0 bottom-5 z-[120] px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-white/70 bg-[rgba(242,241,241,0.96)] p-5 shadow-sm backdrop-blur">
            <p className="text-sm font-medium text-zinc-900">{copy.title}</p>
            <p className="mt-2 text-sm text-zinc-700">{copy.body}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-900"
                onClick={() => saveConsent(createCookieConsent({ analytics: true, marketing: true }))}
              >
                {copy.acceptAll}
              </button>
              <button
                type="button"
                className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-800"
                onClick={() => saveConsent(createCookieConsent({ analytics: false, marketing: false }))}
              >
                {copy.reject}
              </button>
              <button
                type="button"
                className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-medium text-zinc-800"
                onClick={() => setIsConfigOpen((current) => !current)}
              >
                {copy.configure}
              </button>
            </div>
            {isConfigOpen ? (
              <div className="mt-4 space-y-3 border-t border-zinc-200 pt-4 text-sm text-zinc-700">
                <label className="flex items-center justify-between gap-4">
                  <span>{copy.necessary}</span>
                  <span className="text-xs text-zinc-500">Siempre activas</span>
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span>{copy.analytics}</span>
                  <input
                    type="checkbox"
                    checked={draft.analytics}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        analytics: event.target.checked,
                      }))
                    }
                  />
                </label>
                <label className="flex items-center justify-between gap-4">
                  <span>{copy.marketing}</span>
                  <input
                    type="checkbox"
                    checked={draft.marketing}
                    onChange={(event) =>
                      setDraft((current) => ({
                        ...current,
                        marketing: event.target.checked,
                      }))
                    }
                  />
                </label>
                <button
                  type="button"
                  className="rounded-full bg-white px-4 py-2 text-xs font-medium text-zinc-900"
                  onClick={() =>
                    saveConsent(
                      createCookieConsent({
                        analytics: draft.analytics,
                        marketing: draft.marketing,
                      })
                    )
                  }
                >
                  {copy.save}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
