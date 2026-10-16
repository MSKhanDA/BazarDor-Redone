"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export function ProfileUpdateForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const { language } = useLanguage();
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error(t(language, "nameRequired"));
      return;
    }
    setLoading(true);
    try {
      const result = await authClient.updateUser({ name: trimmedName });
      if (result.error) throw new Error(result.error.message ?? t(language, "profileUpdateError"));
      toast.success(t(language, "profileUpdated"));
      router.push("/profile");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t(language, "profileUpdateError"));
    } finally {
      setLoading(false);
    }
  }

  return <form onSubmit={onSubmit} className="max-w-lg space-y-5"><label className="block text-sm font-semibold">{t(language, "name")}<input value={name} onChange={(event) => setName(event.target.value)} required maxLength={80} className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand" /></label><button disabled={loading} className="rounded-xl bg-brand px-5 py-3 font-bold text-white hover:bg-brand-dark disabled:opacity-60">{loading ? t(language, "updating") : t(language, "updateButton")}</button></form>;
}
