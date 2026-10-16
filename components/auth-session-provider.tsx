"use client";

import { createContext, useContext } from "react";
import { authClient } from "@/lib/auth-client";

const AuthSessionContext = createContext<ReturnType<typeof authClient.useSession> | null>(null);

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const session = authClient.useSession();
  return <AuthSessionContext.Provider value={session}>{children}</AuthSessionContext.Provider>;
}

export function useAuthSession() {
  const session = useContext(AuthSessionContext);
  if (!session) throw new Error("useAuthSession must be used inside AuthSessionProvider");
  return session;
}
