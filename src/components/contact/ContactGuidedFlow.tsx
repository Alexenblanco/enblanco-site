"use client";

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { LEAD_SERVICE_IDS } from "@/lib/lead-form-services";
import type { LeadType } from "@/app/api/lead/route";

const NAME_MIN = 2;
const MESSAGE_MIN = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Tamaño mínimo de fuente al reducir para que el texto quepa (legibilidad) */
const MIN_FONT_SIZE_PX = 12;
/** Transición suave al cambiar font-size */
const FONT_SIZE_TRANSITION_MS = 120;

type ContactDict = Dictionary["contact"];

type Props = {
  dict: ContactDict;
  lang: "es" | "en";
  privacyHref: string;
  pageUrl: string;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  services: string[];
  message: string;
  acceptPrivacy: boolean;
};

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  company: "",
  services: [],
  message: "",
  acceptPrivacy: false,
};

function getTotalSteps(type: LeadType): number {
  return type === "project" ? 6 : 5;
}
function getServicesStep(): number {
  return 4;
}
function getMessageStep(type: LeadType): number {
  return type === "project" ? 5 : 4;
}
function getLegalStep(type: LeadType): number {
  return getTotalSteps(type);
}

export default function ContactGuidedFlow({ dict, lang, privacyHref, pageUrl }: Props) {
  const [leadType, setLeadType] = useState<LeadType | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "rate_limit">("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const totalSteps = leadType ? getTotalSteps(leadType) : 0;
  const stepInputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const measureSpanRef = useRef<HTMLSpanElement | null>(null);
  const [dynamicFontSizePx, setDynamicFontSizePx] = useState<number | null>(null);
  const prevStepRef = useRef(step);
  const baseFontSizeRef = useRef<number | null>(null);
  const [resizeDeps, setResizeDeps] = useState(0);

  useEffect(() => {
    if (!leadType) return;
    const hasInput = step === 1 || step === 2 || step === 3 || step === getMessageStep(leadType);
    if (hasInput) stepInputRef.current?.focus();
  }, [leadType, step]);

  useEffect(() => {
    const wrapper = inputWrapperRef.current;
    if (!wrapper) return;
    const ro = new ResizeObserver(() => setResizeDeps((d) => d + 1));
    ro.observe(wrapper);
    return () => ro.disconnect();
  }, [step, leadType]);

  useLayoutEffect(() => {
    if (prevStepRef.current !== step) {
      setDynamicFontSizePx(null);
      baseFontSizeRef.current = null;
      prevStepRef.current = step;
    }
    const hasInput = leadType && (step === 1 || step === 2 || step === 3 || step === getMessageStep(leadType));
    if (!hasInput) return;
    const inputEl = stepInputRef.current;
    const wrapperEl = inputWrapperRef.current;
    const measureSpan = measureSpanRef.current;
    if (!inputEl || !wrapperEl || !measureSpan) return;

    const value =
      step === 1 ? form.name : step === 2 ? form.email : step === 3 ? form.phone : form.message;
    const textToMeasure = value || (inputEl.getAttribute("placeholder") ?? "");
    const availableWidth = wrapperEl.clientWidth;
    if (availableWidth <= 0) return;

    const computed = getComputedStyle(inputEl);
    if (baseFontSizeRef.current == null) {
      baseFontSizeRef.current = parseFloat(computed.fontSize);
    }
    const baseFontSize = baseFontSizeRef.current;

    measureSpan.style.fontFamily = computed.fontFamily;
    measureSpan.style.fontSize = `${baseFontSize}px`;
    measureSpan.style.fontWeight = computed.fontWeight;
    measureSpan.style.letterSpacing = computed.letterSpacing;
    measureSpan.style.textTransform = computed.textTransform;
    measureSpan.style.lineHeight = computed.lineHeight;
    measureSpan.style.whiteSpace = "pre";
    measureSpan.textContent = textToMeasure;

    const measuredTextWidth = measureSpan.offsetWidth;

    if (measuredTextWidth <= availableWidth) {
      setDynamicFontSizePx(null);
    } else {
      const nextFontSize = Math.max(
        MIN_FONT_SIZE_PX,
        Math.min(baseFontSize, baseFontSize * (availableWidth / measuredTextWidth))
      );
      setDynamicFontSizePx(nextFontSize);
    }
  }, [leadType, step, form.name, form.email, form.phone, form.message, resizeDeps]);

  const setField = useCallback(<K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }));
  }, []);

  const validateStep = useCallback(
    (currentStep: number): boolean => {
      const err: Partial<Record<keyof FormData, string>> = {};
      if (currentStep === 1) {
        if (!form.name.trim()) err.name = dict.errors.nameRequired;
        else if (form.name.trim().length < NAME_MIN) err.name = dict.errors.nameMin;
      }
      if (currentStep === 2) {
        if (!form.email.trim()) err.email = dict.errors.emailRequired;
        else if (!EMAIL_REGEX.test(form.email.trim())) err.email = dict.errors.emailInvalid;
      }
      if (leadType === "project" && currentStep === getServicesStep()) {
        if (!form.services.length) err.services = dict.errors.servicesRequired;
      }
      const msgStep = getMessageStep(leadType!);
      if (currentStep === msgStep) {
        if (!form.message.trim()) err.message = dict.errors.messageRequired;
        else if (form.message.trim().length < MESSAGE_MIN) err.message = dict.errors.messageMin;
      }
      if (currentStep === getLegalStep(leadType!)) {
        if (!form.acceptPrivacy) err.acceptPrivacy = dict.errors.privacyRequired;
      }
      setFieldErrors(err);
      return Object.keys(err).length === 0;
    },
    [form, leadType, dict.errors]
  );

  const goNext = useCallback(() => {
    if (!leadType) return;
    if (!validateStep(step)) return;
    if (step < totalSteps) setStep((s) => s + 1);
  }, [leadType, step, totalSteps, validateStep]);

  const goBack = useCallback(() => {
    if (step > 1) setStep((s) => s - 1);
    else setLeadType(null);
  }, [step]);

  const submit = useCallback(async () => {
    if (!leadType) return;
    if (!validateStep(step)) return;
    setLoading(true);
    setSubmitStatus("idle");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          pageUrl,
          type: leadType,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          company: form.company,
          servicesInterested: leadType === "project" ? form.services : undefined,
          message: form.message.trim(),
          acceptPrivacyPolicy: form.acceptPrivacy,
        }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) setSubmitStatus("success");
      else if (res.status === 429) setSubmitStatus("rate_limit");
      else setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    } finally {
      setLoading(false);
    }
  }, [leadType, step, form, lang, pageUrl, validateStep]);

  const isLastStep = leadType ? step === getTotalSteps(leadType) : false;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      if (isLastStep) submit();
      else goNext();
    },
    [isLastStep, goNext, submit]
  );

  const closeOverlay = useCallback(() => setLeadType(null), []);

  if (leadType === null) {
    return (
      <section className="border-t border-zinc-200 pt-8" aria-label="Tipo de consulta">
        <p className="text-sm text-zinc-700">{dict.heroSubtitle}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {(["project", "contact", "talent"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setLeadType(type);
                setStep(1);
                setFieldErrors({});
              }}
              className="rounded border border-zinc-300 bg-white px-4 py-4 text-left transition hover:border-zinc-400 hover:bg-zinc-50"
              aria-label={dict.options[type].title}
            >
              <span className="block text-sm font-medium text-zinc-900">{dict.options[type].title}</span>
              <span className="mt-1 block text-xs text-zinc-600">{dict.options[type].subtitle}</span>
            </button>
          ))}
        </div>
      </section>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex min-h-screen flex-col overflow-x-hidden backdrop-blur-2xl bg-[#e8e6e3]/75"
      aria-label="Formulario de contacto"
      role="dialog"
      aria-modal="true"
    >
      <span
        ref={measureSpanRef}
        aria-hidden
        className="pointer-events-none invisible absolute left-[-9999px]"
        style={{ position: "fixed" }}
      />
      <div className="shrink-0 pt-[calc(env(safe-area-inset-top)+0.75rem)] pb-2 flex justify-center">
        <button
          type="button"
          onClick={closeOverlay}
          className="flex h-6 w-6 items-center justify-center rounded-full border border-white/60 bg-white/10 text-zinc-800 transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label={lang === "es" ? "Cerrar y volver al contacto" : "Close and return to contact"}
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="none" aria-hidden className="scale-90">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-center justify-center overflow-x-hidden px-6 pb-8">
        {submitStatus === "success" && (
          <div className="flex flex-col items-center gap-6">
            <p className="text-center text-lg text-zinc-800" role="status">
              {dict.success}
            </p>
            <button
              type="button"
              onClick={() => setLeadType(null)}
              className="rounded-full border border-white/60 bg-transparent px-6 py-3 text-sm font-medium text-zinc-800 transition hover:bg-white/20"
            >
              {dict.back}
            </button>
          </div>
        )}
        {(submitStatus === "error" || submitStatus === "rate_limit") && (
          <p
            className={`mb-4 text-center text-sm ${submitStatus === "error" ? "text-red-700" : "text-amber-800"}`}
            role="alert"
          >
            {submitStatus === "error" ? dict.errorSend : dict.errorRateLimit}
          </p>
        )}

        {submitStatus !== "success" && (
          <>
            <div className="mb-16 w-full max-w-xl">
              <div className="flex justify-center gap-1">
                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 max-w-6 rounded-full transition-colors ${
                      s === step ? "bg-white" : "bg-white/50"
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="grid w-full max-w-xl grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-0">
                <label htmlFor="lead-name" className="sr-only col-span-3">{dict.labels.name}</label>
                <span className="invisible shrink-0 rounded-full border border-white/60 px-6 py-2 text-xs font-medium" aria-hidden>{dict.back}</span>
                <div ref={inputWrapperRef} className="min-w-0 w-full">
                  <input
                    ref={stepInputRef as React.RefObject<HTMLInputElement>}
                    id="lead-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setField("name", e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="name"
                    placeholder={dict.placeholders.name}
                    className={`w-full max-w-full bg-transparent text-center text-2xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-500 sm:text-3xl md:text-4xl ${!form.name.trim() ? "caret-transparent" : ""}`}
                    style={{
                      outline: "none",
                      boxSizing: "border-box",
                      transition: `font-size ${FONT_SIZE_TRANSITION_MS}ms ease`,
                      ...(step === 1 && dynamicFontSizePx != null ? { fontSize: `${dynamicFontSizePx}px` } : {}),
                    }}
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? "lead-name-err" : undefined}
                  />
                </div>
                <span className="invisible shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium" aria-hidden>{isLastStep ? dict.send : dict.next}</span>
                <button type="button" onClick={goBack} className="shrink-0 rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                <div className="h-[2px] min-w-0 bg-white" />
                {!isLastStep ? (
                  <button type="button" onClick={goNext} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                ) : (
                  <button type="button" onClick={submit} disabled={loading} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:opacity-60">{loading ? "…" : dict.send}</button>
                )}
                {fieldErrors.name && (
                  <p id="lead-name-err" className="col-span-3 mt-1 text-center text-sm text-red-700" role="alert">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
            )}

            {step === 2 && (
              <div className="grid w-full max-w-xl grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-0">
                <label htmlFor="lead-email" className="sr-only col-span-3">{dict.labels.email}</label>
                <span className="invisible shrink-0 rounded-full border border-white/60 px-6 py-2 text-xs font-medium" aria-hidden>{dict.back}</span>
                <div ref={inputWrapperRef} className="min-w-0 w-full">
                  <input
                    ref={stepInputRef as React.RefObject<HTMLInputElement>}
                    id="lead-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="email"
                    placeholder={dict.placeholders.email}
                    className={`w-full max-w-full bg-transparent text-center text-2xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-500 sm:text-3xl md:text-4xl ${!form.email.trim() ? "caret-transparent" : ""}`}
                    style={{
                      outline: "none",
                      boxSizing: "border-box",
                      transition: `font-size ${FONT_SIZE_TRANSITION_MS}ms ease`,
                      ...(step === 2 && dynamicFontSizePx != null ? { fontSize: `${dynamicFontSizePx}px` } : {}),
                    }}
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? "lead-email-err" : undefined}
                  />
                </div>
                <span className="invisible shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium" aria-hidden>{isLastStep ? dict.send : dict.next}</span>
                <button type="button" onClick={goBack} className="shrink-0 rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                <div className="h-[2px] min-w-0 bg-white" />
                {!isLastStep ? (
                  <button type="button" onClick={goNext} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                ) : (
                  <button type="button" onClick={submit} disabled={loading} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:opacity-60">{loading ? "…" : dict.send}</button>
                )}
                {fieldErrors.email && (
                  <p id="lead-email-err" className="col-span-3 mt-1 text-center text-sm text-red-700" role="alert">{fieldErrors.email}</p>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="grid w-full max-w-xl grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-0">
                <label htmlFor="lead-phone" className="sr-only col-span-3">{dict.labels.phone}</label>
                <span className="invisible shrink-0 rounded-full border border-white/60 px-6 py-2 text-xs font-medium" aria-hidden>{dict.back}</span>
                <div ref={inputWrapperRef} className="min-w-0 w-full">
                  <input
                    ref={stepInputRef as React.RefObject<HTMLInputElement>}
                    id="lead-phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setField("phone", e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoComplete="tel"
                    placeholder={dict.placeholders.phone}
                    className={`w-full max-w-full bg-transparent text-center text-2xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-500 sm:text-3xl md:text-4xl ${!form.phone.trim() ? "caret-transparent" : ""}`}
                    style={{
                      outline: "none",
                      boxSizing: "border-box",
                      transition: `font-size ${FONT_SIZE_TRANSITION_MS}ms ease`,
                      ...(step === 3 && dynamicFontSizePx != null ? { fontSize: `${dynamicFontSizePx}px` } : {}),
                    }}
                  />
                </div>
                <span className="invisible shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium" aria-hidden>{isLastStep ? dict.send : dict.next}</span>
                <button type="button" onClick={goBack} className="shrink-0 rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                <div className="h-[2px] min-w-0 bg-white" />
                {!isLastStep ? (
                  <button type="button" onClick={goNext} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                ) : (
                  <button type="button" onClick={submit} disabled={loading} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:opacity-60">{loading ? "…" : dict.send}</button>
                )}
              </div>
            )}

            <div className="absolute -left-[9999px] opacity-0" aria-hidden>
              <input
                id="lead-company"
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
              />
            </div>

            {leadType === "project" && step === getServicesStep() && (
              <div className="w-full max-w-xl">
                <p className="mb-6 text-center text-xl font-light text-zinc-800 sm:text-2xl">
                  {dict.labels.services}
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {LEAD_SERVICE_IDS.map((id) => {
                    const label = (dict.services as Record<string, string>)[id] ?? id;
                    const checked = form.services.includes(id);
                    return (
                      <label
                        key={id}
                        className={`cursor-pointer rounded-full px-4 py-2 text-sm transition ${
                          checked ? "bg-white text-zinc-900" : "bg-white/40 text-zinc-700 hover:bg-white/60"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) => {
                            setField(
                              "services",
                              e.target.checked
                                ? [...form.services, id]
                                : form.services.filter((s) => s !== id)
                            );
                          }}
                          className="sr-only"
                        />
                        {label}
                      </label>
                    );
                  })}
                </div>
                {fieldErrors.services && (
                  <p className="mt-2 text-center text-sm text-red-700" role="alert">
                    {fieldErrors.services}
                  </p>
                )}
              </div>
            )}

            {step === getMessageStep(leadType) && (
              <div className="grid w-full max-w-xl grid-cols-[auto_1fr_auto] items-center gap-x-8 gap-y-0">
                <label htmlFor="lead-message" className="sr-only col-span-3">{dict.labels.message}</label>
                <span className="invisible shrink-0 rounded-full border border-white/60 px-6 py-2 text-xs font-medium" aria-hidden>{dict.back}</span>
                <div ref={inputWrapperRef} className="min-w-0 w-full">
                  <textarea
                    ref={stepInputRef as React.RefObject<HTMLTextAreaElement>}
                    id="lead-message"
                    value={form.message}
                    onChange={(e) => setField("message", e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={dict.placeholders.message}
                    rows={4}
                    className={`w-full max-w-full resize-none bg-transparent text-center text-xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-500 sm:text-2xl ${!form.message.trim() ? "caret-transparent" : ""}`}
                    style={{
                      outline: "none",
                      boxSizing: "border-box",
                      transition: `font-size ${FONT_SIZE_TRANSITION_MS}ms ease`,
                      ...(step === getMessageStep(leadType) && dynamicFontSizePx != null ? { fontSize: `${dynamicFontSizePx}px` } : {}),
                    }}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "lead-message-err" : undefined}
                  />
                </div>
                <span className="invisible shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium" aria-hidden>{isLastStep ? dict.send : dict.next}</span>
                <button type="button" onClick={goBack} className="shrink-0 rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                <div className="h-[2px] min-w-0 bg-white" />
                {!isLastStep ? (
                  <button type="button" onClick={goNext} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                ) : (
                  <button type="button" onClick={submit} disabled={loading} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:opacity-60">{loading ? "…" : dict.send}</button>
                )}
                {fieldErrors.message && (
                  <p id="lead-message-err" className="col-span-3 mt-1 text-center text-sm text-red-700" role="alert">{fieldErrors.message}</p>
                )}
              </div>
            )}

            {isLastStep && (
              <div className="w-full max-w-xl text-center">
                <div className="flex flex-col items-center gap-3">
                  <label className="flex cursor-pointer items-start gap-3 text-left text-base font-light text-zinc-800">
                    <input
                      type="checkbox"
                      checked={form.acceptPrivacy}
                      onChange={(e) => setField("acceptPrivacy", e.target.checked)}
                      className="mt-1.5 h-4 w-4 rounded border-white bg-white/20"
                      aria-invalid={!!fieldErrors.acceptPrivacy}
                    />
                    <span>
                      {(() => {
                        const parts = dict.legal.split(/<privacyLink>|<\/privacyLink>/);
                        return (
                          <>
                            {parts[0]}
                            <Link href={privacyHref} className="underline hover:text-zinc-900">
                              {parts[1]}
                            </Link>
                            {parts[2] ?? ""}
                          </>
                        );
                      })()}
                    </span>
                  </label>
                  {fieldErrors.acceptPrivacy && (
                    <p className="text-sm text-red-700" role="alert">
                      {fieldErrors.acceptPrivacy}
                    </p>
                  )}
                </div>
              </div>
            )}

            {((leadType === "project" && step === getServicesStep()) || isLastStep) && (
              <div className="mt-8 flex w-full max-w-xl items-center gap-4">
                <button type="button" onClick={goBack} className="shrink-0 rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                <div className="h-[2px] flex-1 bg-white" />
                {!isLastStep ? (
                  <button type="button" onClick={goNext} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                ) : (
                  <button type="button" onClick={submit} disabled={loading} className="shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:opacity-60">{loading ? "…" : dict.send}</button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
