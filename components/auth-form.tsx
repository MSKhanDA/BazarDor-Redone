"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Github, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const isSignup = mode === "signup";

  useEffect(() => {
    if (!isSignup && searchParams.get("protected") === "1") {
      toast(t(language, "protectedToast"), { icon: "🔐" });
    }
  }, [isSignup, language, searchParams]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const name = String(form.get("name") ?? "").trim();
    if (!email || !password || (isSignup && !name)) {
      toast.error(t(language, "validationError"));
      return;
    }
    setLoading(true);
    try {
      if (isSignup) {
        const result = await authClient.signUp.email({ name, email, password });
        if (result.error) throw new Error(result.error.message ?? t(language, "signupError"));
        toast.success(t(language, "createAccountSuccess"));
        router.push("/signin");
      } else {
        const result = await authClient.signIn.email({ email, password });
        if (result.error) throw new Error(result.error.message ?? t(language, "signinError"));
        toast.success(t(language, "signinSuccess"));
        const destination = searchParams.get("next");
        if (destination?.startsWith("/")) {
          sessionStorage.setItem("protected-route-notice", "1");
          router.push(destination);
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : t(language, "authError");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  async function socialSignIn(provider: "google" | "github") {
    try {
      await authClient.signIn.social({ provider, callbackURL: "/" });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t(language, "socialError"));
    }
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-line bg-white p-6 shadow-card sm:p-9">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-light text-2xl">🔐</span>
      <p className="mt-5 text-sm font-bold text-brand">{isSignup ? t(language, "signupEyebrow") : t(language, "signinEyebrow")}</p>
      <h1 className="mt-1 text-3xl font-black">{isSignup ? t(language, "signupTitle") : t(language, "signinTitle")}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">{isSignup ? t(language, "signupDescription") : t(language, "signinDescription")}</p>
      {!isSignup && searchParams.get("protected") === "1" && <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{t(language, "protectedNotice")}</p>}
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        {isSignup && <label className="block text-sm font-semibold">{t(language, "name")}<input name="name" autoComplete="name" required className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand" placeholder={t(language, "namePlaceholder")} /></label>}
        <label className="block text-sm font-semibold">{t(language, "email")}<input name="email" type="email" autoComplete="email" required className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand" placeholder="name@example.com" /></label>
        <label className="block text-sm font-semibold">{t(language, "password")}<input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={8} required className="mt-2 w-full rounded-xl border border-line px-4 py-3 outline-none focus:border-brand" placeholder={t(language, "passwordPlaceholder")} /></label>
        <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 font-bold text-white transition hover:bg-brand-dark disabled:opacity-60">{loading && <LoaderCircle size={18} className="animate-spin" />}{isSignup ? t(language, "createAccount") : t(language, "signIn")}</button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-muted"><span className="h-px flex-1 bg-line" />{t(language, "or")}<span className="h-px flex-1 bg-line" /></div>
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => socialSignIn("google")} className="flex items-center justify-center gap-2 rounded-xl border border-line px-3 py-3 text-sm font-semibold hover:bg-paper"><span className="font-black text-red-500">G</span> Sign in with Google</button>
        <button onClick={() => socialSignIn("github")} className="flex items-center justify-center gap-2 rounded-xl border border-line px-3 py-3 text-sm font-semibold hover:bg-paper"><Github size={17} /> Sign in with GitHub</button>
      </div>
      <p className="mt-6 text-center text-sm text-muted">{isSignup ? t(language, "haveAccount") : t(language, "needAccount")}{" "}<Link href={isSignup ? "/signin" : "/signup"} className="font-bold text-brand hover:underline">{isSignup ? t(language, "signIn") : t(language, "signupTitle")}</Link></p>
    </div>
  );
}
