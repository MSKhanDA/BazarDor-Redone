import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

function SignInContent() {
  return <AuthForm mode="signin" />;
}

export default function SignInPage() {
  return <section className="grid min-h-[70vh] place-items-center bg-paper px-4 py-12"><Suspense fallback={<div className="h-[500px] w-full max-w-md animate-pulse rounded-3xl bg-white" />}><SignInContent /></Suspense></section>;
}
