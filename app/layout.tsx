import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { AuthSessionProvider } from "@/components/auth-session-provider";
import { LanguageProvider } from "@/components/language-provider";
import { getServerLanguage } from "@/lib/server-language";

export const metadata: Metadata = {
  title: "বাজার দর — নিত্যপণ্যের দাম / Market Prices — Daily Commodity Rates",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের দাম ও বাজারভিত্তিক পরিবর্তন এক নজরে। / A quick look at today's prices of essential goods in Bangladesh and their market-based changes.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const language = await getServerLanguage();
  return (
    <html lang={language}>
      <body>
        <LanguageProvider initialLanguage={language}>
          <AuthSessionProvider>
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
            <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
          </AuthSessionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
