import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getServerLanguage } from "@/lib/server-language";
import { t } from "@/lib/i18n";

export default async function NotFound() {
  const language = await getServerLanguage();
  return (
    <section className="mx-auto grid min-h-[55vh] max-w-6xl place-items-center px-4 py-16 text-center">
      <div><span className="text-6xl">🔎</span><p className="mt-5 text-sm font-bold text-brand">{t(language, "notFoundLabel")}</p><h1 className="mt-2 text-3xl font-black">{t(language, "invalidRouteTitle")}</h1><p className="mt-3 text-muted">{t(language, "invalidRouteDescription")}</p><Link href="/" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 font-bold text-white"><ArrowLeft size={17} /> {t(language, "home")}</Link></div>
    </section>
  );
}
