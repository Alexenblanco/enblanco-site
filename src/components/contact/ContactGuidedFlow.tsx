"use client";

import { useState, useCallback, useRef, useEffect, useLayoutEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import type { Dictionary } from "@/dictionaries";
import { LEAD_SERVICE_IDS } from "@/lib/lead-form-services";
import type { LeadType } from "@/app/api/lead/route";
import { isValidEmail } from "@/lib/email-validation";

const NAME_MIN = 2;
const MESSAGE_MIN = 10;

/** Tamaño mínimo de fuente al reducir para que el texto quepa (legibilidad) */
const MIN_FONT_SIZE_PX = 12;
/** Transición suave al cambiar font-size */
const FONT_SIZE_TRANSITION_MS = 120;
const MESSAGE_MAX_HEIGHT_PX = 176;

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

const OPTION_ORDER = ["contact", "project", "talent"] as const;

function getTotalSteps(type: LeadType): number {
  if (type === "project") return 5;
  if (type === "talent") return 3;
  return 4;
}
function getServicesStep(): number {
  return 4;
}
function getMessageStep(type: LeadType): number {
  if (type === "project") return 5;
  if (type === "talent") return 3;
  return 4;
}

function AnimatedFeedback({
  id,
  message,
  tone = "error",
  centered = true,
}: {
  id?: string;
  message?: string;
  tone?: "error" | "warning";
  centered?: boolean;
}) {
  const toneClass = tone === "warning" ? "text-amber-800" : "text-red-700";

  return (
    <div className="min-h-6">
      <AnimatePresence initial={false} mode="wait">
        {message ? (
          <motion.p
            key={message}
            id={id}
            role="alert"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`text-sm ${toneClass} ${centered ? "text-center" : "text-left"}`}
          >
            {message}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export default function ContactGuidedFlow({ dict, lang, privacyHref, pageUrl }: Props) {
  const [leadType, setLeadType] = useState<LeadType | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error" | "rate_limit">("idle");
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [emailTouched, setEmailTouched] = useState(false);

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
    const hasInput =
      step === 1 ||
      step === 2 ||
      (leadType !== "talent" && step === 3) ||
      step === getMessageStep(leadType);
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
    const hasInput = leadType && (step === 1 || step === 2 || (leadType !== "talent" && step === 3));
    if (!hasInput) return;
    const inputEl = stepInputRef.current;
    const wrapperEl = inputWrapperRef.current;
    const measureSpan = measureSpanRef.current;
    if (!inputEl || !wrapperEl || !measureSpan) return;

    const value = step === 1 ? form.name : step === 2 ? form.email : form.phone;
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
  }, [leadType, step, form.name, form.email, form.phone, resizeDeps]);

  useLayoutEffect(() => {
    if (!leadType || step !== getMessageStep(leadType)) return;
    const textarea = stepInputRef.current;
    if (!(textarea instanceof HTMLTextAreaElement)) return;

    textarea.style.height = "0px";
    const nextHeight = Math.min(textarea.scrollHeight, MESSAGE_MAX_HEIGHT_PX);
    textarea.style.height = `${Math.max(nextHeight, 56)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > MESSAGE_MAX_HEIGHT_PX ? "auto" : "hidden";
  }, [leadType, step, form.message]);

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
        else if (!isValidEmail(form.email)) err.email = dict.errors.emailInvalid;
      }
      if (leadType === "project" && currentStep === getServicesStep()) {
        if (!form.services.length) err.services = dict.errors.servicesRequired;
      }
      const msgStep = getMessageStep(leadType!);
      if (currentStep === msgStep) {
        if (!form.message.trim()) err.message = dict.errors.messageRequired;
        else if (form.message.trim().length < MESSAGE_MIN) err.message = dict.errors.messageMin;
      }
      if (currentStep === getMessageStep(leadType!)) {
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
  const optionalPrefix = lang === "es" ? "(opcional) " : "(optional) ";

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const isTextarea = e.currentTarget instanceof HTMLTextAreaElement;
      if (isTextarea && !e.metaKey && !e.ctrlKey) return;
      e.preventDefault();
      if (isLastStep) submit();
      else goNext();
    },
    [isLastStep, goNext, submit]
  );

  const closeOverlay = useCallback(() => setLeadType(null), []);

  if (leadType === null) {
    return (
      <section className="flex w-full flex-col items-center gap-8 text-center" aria-labelledby="contact-flow-heading">
        <h1
          id="contact-flow-heading"
          className="contact-hero-heading !text-[#ffffff] w-full max-w-full whitespace-nowrap text-center text-[min(70.22px,19vw)] leading-none tracking-[-0.05em] md:text-[clamp(104px,8vw,119.899px)]"
        >
          <span className="sr-only">{dict.heroTitle}</span>
          <span aria-hidden>{lang === "es" ? "¿habl\u00A0\u00A0mos?" : "let’s talk?"}</span>
        </h1>
        <div className="grid w-full max-w-[370px] grid-cols-3 gap-[13.5px] md:max-w-[543px] md:gap-5">
          {OPTION_ORDER.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                setLeadType(type);
                setStep(1);
                setFieldErrors({});
                setEmailTouched(false);
              }}
              className="relative isolate h-9 cursor-pointer rounded-full bg-transparent px-0 text-center text-base tracking-[-0.05em] !text-[#8a8a8a] transition hover:!text-[#5d5d5d] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 md:h-[53px] md:text-xl before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-white before:blur-[3.4px] before:transition before:content-[''] hover:before:bg-[#f8f8f8] md:before:blur-[5px]"
              aria-label={`${dict.options[type].title}. ${dict.options[type].subtitle}`}
            >
              {dict.options[type].title}
            </button>
          ))}
        </div>
        <p className="max-w-[332px] text-center text-base leading-none tracking-[-0.05em] !text-[#8a8a8a] md:max-w-[394px] md:text-sm">
          {dict.heroSubtitle}
        </p>
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
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-white/60 bg-white/10 text-zinc-800 transition hover:bg-white/25 focus:outline-none focus:ring-2 focus:ring-white/50"
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
              className="cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-3 text-sm font-medium text-zinc-800 transition hover:bg-white/20"
            >
              {dict.back}
            </button>
          </div>
        )}

        {submitStatus !== "success" && (
          <>
            <div className="mb-4 min-h-6 w-full max-w-xl">
              <AnimatedFeedback
                message={submitStatus === "error" ? dict.errorSend : submitStatus === "rate_limit" ? dict.errorRateLimit : undefined}
                tone={submitStatus === "rate_limit" ? "warning" : "error"}
              />
            </div>
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

            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={`${leadType}-${step}`}
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex w-full flex-col items-center"
              >
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
                        className={`w-full max-w-full bg-transparent text-center text-2xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-400/80 sm:text-3xl md:text-4xl ${!form.name.trim() ? "caret-transparent" : ""}`}
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
                    <button type="button" onClick={goBack} className="shrink-0 cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                    <div className="h-[2px] min-w-0 bg-white" />
                    {!isLastStep ? (
                      <button type="button" onClick={goNext} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                    ) : (
                      <button type="button" onClick={submit} disabled={loading} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "…" : dict.send}</button>
                    )}
                    <div className="col-span-3 mt-2">
                      <AnimatedFeedback id="lead-name-err" message={fieldErrors.name} />
                    </div>
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
                        onChange={(e) => {
                          setField("email", e.target.value);
                          if (emailTouched) {
                            const nextValue = e.target.value;
                            setFieldErrors((prev) => ({
                              ...prev,
                              email: nextValue.trim()
                                ? (isValidEmail(nextValue) ? undefined : dict.errors.emailInvalid)
                                : dict.errors.emailRequired,
                            }));
                          }
                        }}
                        onBlur={() => {
                          setEmailTouched(true);
                          setFieldErrors((prev) => ({
                            ...prev,
                            email: form.email.trim()
                              ? (isValidEmail(form.email) ? undefined : dict.errors.emailInvalid)
                              : dict.errors.emailRequired,
                          }));
                        }}
                        onKeyDown={handleKeyDown}
                        autoComplete="email"
                        placeholder={dict.placeholders.email}
                        className={`w-full max-w-full rounded-md bg-transparent text-center text-2xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-400/80 sm:text-3xl md:text-4xl ${!form.email.trim() ? "caret-transparent" : ""} ${fieldErrors.email ? "ring-1 ring-red-500/50" : ""}`}
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
                    <button type="button" onClick={goBack} className="shrink-0 cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                    <div className="h-[2px] min-w-0 bg-white" />
                    {!isLastStep ? (
                      <button type="button" onClick={goNext} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                    ) : (
                      <button type="button" onClick={submit} disabled={loading} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "…" : dict.send}</button>
                    )}
                    <div className="col-span-3 mt-2">
                      <AnimatedFeedback id="lead-email-err" message={fieldErrors.email} />
                    </div>
                  </div>
                )}

                {leadType !== "talent" && step === 3 && (
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
                        placeholder={`${optionalPrefix}${dict.placeholders.phone}`}
                        className={`w-full max-w-full bg-transparent text-center text-2xl font-light tracking-tight text-zinc-800 placeholder:text-zinc-400/80 sm:text-3xl md:text-4xl ${!form.phone.trim() ? "caret-transparent" : ""}`}
                        style={{
                          outline: "none",
                          boxSizing: "border-box",
                          transition: `font-size ${FONT_SIZE_TRANSITION_MS}ms ease`,
                          ...(step === 3 && dynamicFontSizePx != null ? { fontSize: `${dynamicFontSizePx}px` } : {}),
                        }}
                      />
                    </div>
                    <span className="invisible shrink-0 rounded-full bg-white px-6 py-2 text-xs font-medium" aria-hidden>{isLastStep ? dict.send : dict.next}</span>
                    <button type="button" onClick={goBack} className="shrink-0 cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                    <div className="h-[2px] min-w-0 bg-white" />
                    {!isLastStep ? (
                      <button type="button" onClick={goNext} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                    ) : (
                      <button type="button" onClick={submit} disabled={loading} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "…" : dict.send}</button>
                    )}
                    <div className="col-span-3 mt-2 min-h-6" />
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
                    <div className="mt-3">
                      <AnimatedFeedback message={fieldErrors.services} />
                    </div>
                  </div>
                )}

                {step === getMessageStep(leadType) && (
                  <div className="w-full max-w-xl">
                    <label htmlFor="lead-message" className="sr-only">{dict.labels.message}</label>
                    <div className="grid w-full grid-cols-[auto_1fr_auto] items-end gap-x-8 gap-y-0">
                      <button type="button" onClick={goBack} className="shrink-0 cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                      <div ref={inputWrapperRef} className="relative min-w-0">
                        <textarea
                          ref={stepInputRef as React.RefObject<HTMLTextAreaElement>}
                          id="lead-message"
                          value={form.message}
                          onChange={(e) => setField("message", e.target.value)}
                          onKeyDown={handleKeyDown}
                          placeholder={dict.placeholders.message}
                          rows={1}
                          className={`relative z-[1] w-full max-w-full resize-none overflow-y-auto bg-transparent px-0 pb-3 text-center text-xl font-light leading-relaxed tracking-tight text-zinc-800 placeholder:text-zinc-400/80 sm:text-2xl ${!form.message.trim() ? "caret-transparent" : ""}`}
                          style={{
                            outline: "none",
                            boxSizing: "border-box",
                            maxHeight: `${MESSAGE_MAX_HEIGHT_PX}px`,
                            transition: "color 180ms ease",
                          }}
                          aria-invalid={!!fieldErrors.message}
                          aria-describedby="lead-message-err lead-privacy-err"
                        />
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[2px] bg-white" />
                      </div>
                      <button type="button" onClick={submit} disabled={loading} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "…" : dict.send}</button>
                    </div>
                    <div className="mt-3">
                      <AnimatedFeedback id="lead-message-err" message={fieldErrors.message} centered={false} />
                    </div>
                    <div className="mt-4">
                      <label className="flex cursor-pointer items-start gap-3 text-left text-sm font-light leading-relaxed text-zinc-800 sm:text-base">
                        <span className="relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center">
                          <input
                            type="checkbox"
                            checked={form.acceptPrivacy}
                            onChange={(e) => setField("acceptPrivacy", e.target.checked)}
                            className="peer sr-only"
                            aria-invalid={!!fieldErrors.acceptPrivacy}
                          />
                          <span className="h-4 w-4 rounded-[4px] border border-white/80 bg-white/10 transition peer-checked:border-white peer-checked:bg-white" />
                          <svg
                            viewBox="0 0 16 16"
                            aria-hidden
                            className="pointer-events-none absolute h-2.5 w-2.5 text-zinc-800 opacity-0 transition peer-checked:opacity-100"
                          >
                            <path d="M3.5 8.5 6.5 11.5 12.5 5.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
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
                      <div className="mt-2">
                        <AnimatedFeedback id="lead-privacy-err" message={fieldErrors.acceptPrivacy} centered={false} />
                      </div>
                    </div>
                  </div>
                )}

                {leadType === "project" && step === getServicesStep() && (
                  <div className="mt-8 flex w-full max-w-xl items-center gap-4">
                    <button type="button" onClick={goBack} className="shrink-0 cursor-pointer rounded-full border border-white/60 bg-transparent px-6 py-2 text-xs font-medium text-zinc-800 transition hover:bg-white/20">{dict.back}</button>
                    <div className="h-[2px] flex-1 bg-white" />
                    {!isLastStep ? (
                      <button type="button" onClick={goNext} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90">{dict.next}</button>
                    ) : (
                      <button type="button" onClick={submit} disabled={loading} className="shrink-0 cursor-pointer rounded-full bg-white px-6 py-2 text-xs font-medium text-zinc-900 shadow-sm transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60">{loading ? "…" : dict.send}</button>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
}
