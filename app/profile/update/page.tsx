import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { ProfileUpdateForm } from "@/components/profile-update-form";
import { getServerLanguage } from "@/lib/server-language";
import { t } from "@/lib/i18n";

export default async function UpdateProfilePage() {
  const [session, language] = await Promise.all([auth.api.getSession({ headers: await headers() }), getServerLanguage()]);
  if (!session) redirect("/signin?protected=1");
  return <section className="mx-auto min-h-[60vh] max-w-3xl px-4 py-12 sm:px-6"><p className="text-sm font-bold text-brand">{t(language, "profileSettings")}</p><h1 className="mt-2 text-3xl font-black">{t(language, "updateInformation")}</h1><div className="mt-7 rounded-3xl border border-line bg-white p-6 shadow-card sm:p-8"><ProfileUpdateForm initialName={session.user.name} /></div></section>;
}
