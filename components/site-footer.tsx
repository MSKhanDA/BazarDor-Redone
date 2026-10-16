"use client";

import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export function SiteFooter() {
  const { language } = useLanguage();
  return (
    <footer className="mt-20 border-t border-line bg-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-semibold text-ink">{t(language, "footerTagline")}</p>
        <p>{t(language, "footerDisclaimer")}</p>
      </div>
    </footer>
  );
}
