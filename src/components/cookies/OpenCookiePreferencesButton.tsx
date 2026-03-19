"use client";

type OpenCookiePreferencesButtonProps = {
  label: string;
  className?: string;
};

export default function OpenCookiePreferencesButton({
  label,
  className,
}: OpenCookiePreferencesButtonProps) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("enblanco:open-cookie-preferences"));
      }}
    >
      {label}
    </button>
  );
}
