import type { Locale } from "@/lib/i18n/path";
import LegalPageReveal from "./LegalPageReveal";

type LegalPageLayoutProps = {
  lang: Locale;
  title: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  lang,
  title,
  children,
}: LegalPageLayoutProps) {
  return (
    <main data-legal-lang={lang} className="mx-auto max-w-3xl px-6 py-12">
      <LegalPageReveal
        title={title}
        className="prose prose-zinc max-w-none text-[16px] leading-[20.8px] text-zinc-700 prose-headings:text-zinc-900 [&_p]:text-[16px] [&_p]:leading-[20.8px] [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul>li]:my-1 [&_li]:text-[16px] [&_li]:leading-[20.8px] [&_strong]:font-medium [&_a]:underline [&_a]:underline-offset-2 [&_h1]:text-[24px] [&_h1]:leading-[1.2] [&_h2]:mb-4 [&_h2]:mt-8 [&_h2]:text-[20px] [&_h2]:leading-[1.2] [&_h3]:mb-3 [&_h3]:mt-[18px] [&_h3]:text-[18px] [&_h3]:leading-[1.2] [&_h2:first-of-type]:!mt-8"
      >
        {children}
      </LegalPageReveal>
    </main>
  );
}
