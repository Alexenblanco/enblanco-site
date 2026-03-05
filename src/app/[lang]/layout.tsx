import { notFound } from "next/navigation";
import { ProjectTransitionProvider } from "@/contexts/ProjectTransitionContext";
import { isValidLang } from "@/lib/i18n/path";

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isValidLang(lang)) notFound();

  return (
    <ProjectTransitionProvider>
      {children}
    </ProjectTransitionProvider>
  );
}
