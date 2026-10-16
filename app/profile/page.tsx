import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { UserRound, Pencil } from "lucide-react";
import { auth } from "@/lib/auth";
import { getServerLanguage } from "@/lib/server-language";
import { t } from "@/lib/i18n";

export default async function ProfilePage() {
  const [session, language] = await Promise.all([auth.api.getSession({ headers: await headers() }), getServerLanguage()]);
  if (!session) redirect("/signin?protected=1");

  return <section className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12 sm:px-6"><p className="text-sm font-bold text-brand">{t(language, "account")}</p><h1 className="mt-2 text-3xl font-black">{t(language, "profile")}</h1><div className="mt-7 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"><span className="grid h-16 w-16 place-items-center rounded-full bg-brand-light text-brand"><UserRound size={30} /></span><dl className="mt-6 space-y-4"><div><dt className="text-xs text-muted">{t(language, "name")}</dt><dd className="mt-1 font-bold">{session.user.name}</dd></div><div><dt className="text-xs text-muted">{t(language, "emailLabel")}</dt><dd className="mt-1 font-bold">{session.user.email}</dd></div></dl><Link href="/profile/update" className="mt-7 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-bold text-white hover:bg-brand-dark"><Pencil size={17} /> {t(language, "updateProfile")}</Link></div></section>;
}
