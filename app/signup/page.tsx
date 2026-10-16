import { Suspense } from "react";
import { AuthForm } from "@/components/auth-form";

export default function SignUpPage() {
  return <section className="grid min-h-[70vh] place-items-center bg-paper px-4 py-12"><Suspense fallback={<div className="h-[560px] w-full max-w-md animate-pulse rounded-3xl bg-white" />}><AuthForm mode="signup" /></Suspense></section>;
}
