import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ChevronRight } from "lucide-react";
import { getProducts, formatTaka, Product } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { getServerLanguage } from "@/lib/server-language";
import { Language, productName, t } from "@/lib/i18n";

function ChangeList({ products, rising, language }: { products: Product[]; rising: boolean; language: Language }) {
  const sorted = [...products]
    .filter((product) => (rising ? product.change.dir === "up" : product.change.dir === "down"))
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, 6);

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((product) => (
        <Link key={product.id} href={`/product/${product.slug}`} className="flex min-w-0 items-center gap-2 rounded-xl border border-line bg-white p-3 transition hover:border-brand/30 sm:gap-3 sm:p-4">
          <span className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-paper text-2xl sm:h-11 sm:w-11">{product.image}</span>
            <span className="min-w-0 flex-1">
              <span className="block break-words font-bold leading-5">{productName(product.slug, product.nameBn, language)}</span>
              <span className="block whitespace-nowrap text-xs text-muted">{formatTaka(product.today, language)} {t(language, "taka")}</span>
            </span>
          </span>
          <span className={`inline-flex shrink-0 items-center gap-0.5 whitespace-nowrap text-xs font-bold sm:gap-1 sm:text-sm ${rising ? "text-brand" : "text-red-600"}`}>
            {rising ? <ArrowUpRight size={15} /> : <ArrowDown size={15} />}{Math.abs(product.change.pct).toLocaleString(language === "bn" ? "bn-BD" : "en-BD")}%
          </span>
        </Link>
      ))}
      {!sorted.length && <p className="text-sm text-muted">{t(language, "changesUnavailable")}</p>}
    </div>
  );
}

export default async function HomePage() {
  const language = await getServerLanguage();
  let products: Product[];
  try {
    products = await getProducts();
  } catch (error) {
    console.error("Home catalog request failed:", error);
    return <div className="mx-auto max-w-6xl px-4 py-24 text-center"><h1 className="text-2xl font-bold">{t(language, "errorTitle")}</h1><p className="mt-2 text-muted">{t(language, "errorDescription")}</p><a href="/" className="mt-5 inline-flex rounded-full bg-brand px-5 py-3 text-white">{t(language, "retry")}</a></div>;
  }

  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 sm:px-6 md:grid-cols-2 md:py-16">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-3 py-1.5 text-xs font-bold text-brand"><span className="h-2 w-2 rounded-full bg-brand" /> {t(language, "heroEyebrow")}</span>
          <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">{t(language, "heroTitleLead")} <span className="text-brand">{t(language, "heroTitleAccent")}</span></h1>
          <p className="mt-5 max-w-lg leading-7 text-muted">{t(language, "heroDescription")}</p>
          <a href="#সব-পণ্য" className="mt-7 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-bold text-white shadow-md transition hover:bg-brand-dark">{t(language, "heroCta")} <ChevronRight size={18} /></a>
          <div className="mt-8 flex gap-8 text-sm"><span><strong className="block text-xl text-ink">{products.length.toLocaleString(language === "bn" ? "bn-BD" : "en-BD")}+</strong><span className="text-muted">{t(language, "essentials")}</span></span><span><strong className="block text-xl text-ink">{language === "bn" ? "৮" : "8"}</strong><span className="text-muted">{t(language, "categoryCount")}</span></span><span><strong className="block text-xl text-ink">{t(language, "updatedDaily")}</strong><span className="text-muted">{t(language, "updateLabel")}</span></span></div>
        </div>
        <div className="relative mx-auto w-full max-w-lg overflow-hidden rounded-[2rem] bg-brand-light">
          <Image src="/bazar-hero.png" alt={t(language, "heroImageAlt")} width={1100} height={650} priority className="h-auto w-full object-cover" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-4 py-3 shadow-lg sm:bottom-6 sm:left-6"><p className="text-xs text-muted">{t(language, "marketUpdate")}</p><p className="mt-1 font-bold text-brand">{t(language, "trustedPrices")}</p></div>
        </div>
      </section>

      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-7"><p className="text-sm font-bold text-brand">{t(language, "marketMovement")}</p><h2 className="mt-1 text-2xl font-extrabold">{t(language, "priceChanges")}</h2></div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div><h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand"><ArrowUpRight size={20} /> {t(language, "risenToday")}</h3><ChangeList products={products} rising language={language} /></div>
            <div><h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-red-600"><ArrowDown size={18} /> {t(language, "fallenToday")}</h3><ChangeList products={products} rising={false} language={language} /></div>
          </div>
        </div>
      </section>

      <section id="সব-পণ্য" className="mx-auto max-w-6xl scroll-mt-8 px-4 py-14 sm:px-6 sm:py-16">
        <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
          <div><p className="text-sm font-bold text-brand">{t(language, "findProducts")}</p><h2 className="mt-1 text-3xl font-extrabold">{t(language, "allProducts")}</h2><p className="mt-2 text-sm text-muted">{t(language, "allProductsSubtitle")}</p></div>
          <span className="rounded-full bg-paper px-3 py-1.5 text-sm text-muted">{products.length.toLocaleString(language === "bn" ? "bn-BD" : "en-BD")} {t(language, "productsCount")}</span>
        </div>
        <ProductGrid products={products} />
      </section>
    </>
  );
}
