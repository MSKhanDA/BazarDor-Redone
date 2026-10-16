"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { useAuthSession } from "@/components/auth-session-provider";
import { Category, Product } from "@/lib/products";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/language-provider";
import { categoryName, productName, t } from "@/lib/i18n";
import { formatTaka, unitLabel } from "@/lib/products";

const categoryFallback: Category[] = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

function displayDate(language: "bn" | "en") {
  return new Intl.DateTimeFormat(language === "bn" ? "bn-BD" : "en-BD", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" }).format(new Date());
}

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { data: session, isPending } = useAuthSession();
  const [categories, setCategories] = useState(categoryFallback);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetch("/api/catalog/categories").then((response) => {
        if (!response.ok) throw new Error("Category request failed");
        return response.json() as Promise<Category[]>;
      }),
      fetch("/api/catalog/products").then((response) => {
        if (!response.ok) throw new Error("Product request failed");
        return response.json() as Promise<Product[]>;
      }),
    ])
      .then(([nextCategories, nextProducts]) => {
        if (!active) return;
        setCategories(nextCategories);
        setProducts(nextProducts);
      })
      .catch((error: unknown) => {
        console.error("Could not load header catalog:", error);
      });
    return () => {
      active = false;
    };
  }, []);

  async function signOut() {
    const result = await authClient.signOut();
    if (result.error) {
      toast.error(result.error.message ?? (language === "bn" ? "সাইন আউট করা যায়নি" : "Could not sign out"));
      return;
    }
    toast.success(language === "bn" ? "সফলভাবে সাইন আউট হয়েছে" : "You have been signed out successfully");
    router.push("/");
    router.refresh();
  }

  const tickerItems: Pick<Product, "id" | "slug" | "image" | "nameBn" | "today" | "unit" | "change">[] = products.length
    ? products
    : [{ id: 0, slug: "", image: "🛒", nameBn: "আজকের বাজার", today: 0, unit: "পণ্য", change: { dir: "flat", pct: 0 } }];

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label={language === "bn" ? "বাজার দর হোম" : "BazarDor home"}>
          <Image src="/logo-icon.png" alt="" width={44} height={44} className="h-11 w-11 rounded-xl" priority />
          <span>
            <span className="block text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{language === "bn" ? "বাজার দর" : "BazarDor"}</span>
            <span className="block text-xs text-muted">{displayDate(language)}</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-line bg-paper p-1" aria-label="Select language">
            <button type="button" onClick={() => setLanguage("bn")} aria-pressed={language === "bn"} className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition ${language === "bn" ? "bg-white text-brand shadow-sm" : "text-muted"}`}>বাংলা</button>
            <button type="button" onClick={() => setLanguage("en")} aria-pressed={language === "en"} className={`rounded-full px-2.5 py-1.5 text-xs font-bold transition ${language === "en" ? "bg-white text-brand shadow-sm" : "text-muted"}`}>English</button>
          </div>
          {isPending ? (
            <span className="h-9 w-24 animate-pulse rounded-full bg-paper" aria-label={t(language, "loading")} />
          ) : session?.user ? (
            <>
              <Link href="/profile" className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-2 text-sm font-semibold hover:bg-paper">
                <UserRound size={16} /> <span className="hidden sm:inline">{t(language, "myProfile")}</span>
              </Link>
              <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark">
                <LogOut size={16} /><span className="hidden sm:inline">{t(language, "signOut")}</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/signin" className="rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-paper">{t(language, "signIn")}</Link>
              <Link href="/signup" className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark">{t(language, "signUp")}</Link>
            </>
          )}
        </div>

        <nav className="order-3 flex w-full gap-1 overflow-x-auto pb-1 text-sm sm:justify-center" aria-label={t(language, "categories")}>
          <Link href="/" className={`shrink-0 rounded-full px-3 py-2 ${pathname === "/" ? "bg-brand-light font-bold text-brand" : "text-muted hover:bg-paper"}`}>{t(language, "allProducts")}</Link>
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;
            return <Link key={category.id} href={`/category/${category.slug}`} className={`shrink-0 rounded-full px-3 py-2 ${active ? "bg-brand-light font-bold text-brand" : "text-muted hover:bg-paper"}`}>{category.icon} {categoryName(category.slug, category.nameBn, language)}</Link>;
          })}
        </nav>
      </div>

      <div className="ticker overflow-hidden border-y border-line bg-paper py-2.5">
        <div className="ticker-track flex w-max items-center">
          {[...tickerItems, ...tickerItems].map((product, index) => (
            <span key={`${product.id}-${index}`} className="mx-5 inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-ink sm:text-sm">
              <span>{product.image}</span><span>{productName(product.slug, product.nameBn, language)}</span><span className="text-muted">{formatTaka(product.today, language)} {t(language, "taka")}/{unitLabel(product.unit, language)}</span>
              <span className={product.change.dir === "up" ? "text-brand" : product.change.dir === "down" ? "text-red-600" : "text-muted"}>
                {product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"} {Math.abs(product.change.pct).toLocaleString(language === "bn" ? "bn-BD" : "en-BD")}%
              </span><span className="text-gray-300">•</span>
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
