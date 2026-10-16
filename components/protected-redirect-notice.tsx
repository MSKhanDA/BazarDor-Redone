"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export function ProtectedRedirectNotice() {
  const { language } = useLanguage();
  useEffect(() => {
    if (sessionStorage.getItem("protected-route-notice") === "1") {
      sessionStorage.removeItem("protected-route-notice");
      toast(t(language, "protectedNotice"), { icon: "🔐" });
    }
  }, [language]);
  return null;
}
