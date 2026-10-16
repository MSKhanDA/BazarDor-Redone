import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { formatTaka, getProducts, unitLabel } from "@/lib/products";
import { ProtectedRedirectNotice } from "@/components/protected-redirect-notice";
import { categoryName, divisionName, marketName, productName, t } from "@/lib/i18n";
import { getServerLanguage } from "@/lib/server-language";

export const dynamicParams = true;

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const language = await getServerLanguage();
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect(`/signin?next=${encodeURIComponent(`/product/${slug}`)}&protected=1`);

  const products = await getProducts();
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  const markets = [...product.markets].sort((a, b) => a.min - b.min);
  const marketPrices = markets.flatMap((market) => [market.min, market.max]);
  const ranges = {
    min: marketPrices.length ? Math.min(...marketPrices) : product.today,
    max: marketPrices.length ? Math.max(...marketPrices) : product.today,
    average: Math.round(product.today),
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <ProtectedRedirectNotice />
      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-9">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4"><span className="grid h-20 w-20 place-items-center rounded-3xl bg-paper text-5xl">{product.image}</span><div><p className="text-sm font-bold text-brand">{product.categoryIcon} {categoryName(product.category, product.categoryNameBn, language)}</p><h1 className="mt-1 text-3xl font-black">{productName(product.slug, product.nameBn, language)}</h1><p className="mt-2 text-sm text-muted">{unitLabel(product.unit, language)} · {t(language, "todayMarketPrice")}</p></div></div>
            <span className="rounded-full bg-brand-light px-3 py-1.5 text-sm font-bold text-brand">{product.change.dir === "up" ? "▲" : product.change.dir === "down" ? "▼" : "—"} {Math.abs(product.change.pct).toLocaleString(language === "bn" ? "bn-BD" : "en-BD")}%</span>
          </div>
          <div className="mt-8 rounded-2xl bg-paper p-5"><p className="text-sm text-muted">{t(language, "averageMarketPrice")}</p><p className="mt-1 text-4xl font-black text-brand">{formatTaka(product.today, language)} <span className="text-lg">{t(language, "taka")}</span></p><p className="mt-2 text-xs text-muted">{t(language, "previousDayPrice")} {formatTaka(product.yesterday, language)} {t(language, "taka")} · {t(language, "lastWeekPrice")} {formatTaka(product.lastWeek, language)} {t(language, "taka")}</p></div>
          <div className="mt-7"><h2 className="text-lg font-extrabold">{t(language, "priceSummary")}</h2><div className="mt-3 grid grid-cols-3 gap-3">{[[t(language, "minPrice"), ranges.min], [t(language, "maxPrice"), ranges.max], [t(language, "averagePrice"), ranges.average]].map(([label, value]) => <div key={label} className="rounded-xl border border-line p-3 sm:p-4"><p className="text-xs text-muted">{label}</p><p className="mt-1 font-bold">{formatTaka(Number(value), language)} {t(language, "takaSymbol")}</p></div>)}</div></div>
        </div>
        <aside className="rounded-3xl bg-brand p-6 text-white sm:p-8"><p className="text-sm font-semibold text-white/75">{t(language, "todayMovement")}</p><h2 className="mt-2 text-2xl font-extrabold">{t(language, "todayMarketPrices")}</h2><p className="mt-2 text-sm text-white/75">{t(language, "marketRangeDescription")}</p><div className="mt-6 space-y-3">{markets.map((market, index) => <div key={`${market.market}-${index}`} className="rounded-xl bg-white/10 p-3"><div className="flex items-center justify-between gap-3"><span className="font-semibold">{marketName(market.market, language)}</span><span className="text-xs text-white/70">{divisionName(market.division, language)}</span></div><div className="mt-2 flex items-center justify-between text-sm text-white/80"><span>{t(language, "minPrice")} <b className="text-white">{formatTaka(market.min, language)} {t(language, "takaSymbol")}</b></span><span>{t(language, "maxPrice")} <b className="text-white">{formatTaka(market.max, language)} {t(language, "takaSymbol")}</b></span></div></div>)}</div></aside>
      </div>
    </section>
  );
}
