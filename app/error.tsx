"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const { language } = useLanguage();
  useEffect(() => console.error("Application route failed:", error), [error]);
  return <div className="mx-auto grid min-h-[55vh] max-w-6xl place-items-center px-4 py-16 text-center"><div><h1 className="text-2xl font-bold">{t(language, "errorTitle")}</h1><p className="mt-2 text-muted">{t(language, "errorDescription")}</p><div className="mt-5 flex justify-center gap-3"><button onClick={() => reset()} className="rounded-full bg-brand px-5 py-3 font-bold text-white">{t(language, "retry")}</button><button onClick={() => router.push("/")} className="rounded-full border border-line px-5 py-3 font-bold">{t(language, "homeButton")}</button></div></div></div>;
}
