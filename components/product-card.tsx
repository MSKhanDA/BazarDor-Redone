"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatTaka, Product, unitLabel } from "@/lib/products";
import { productName, t } from "@/lib/i18n";
import { useLanguage } from "@/components/language-provider";

export function ProductCard({ product }: { product: Product }) {
  const { language } = useLanguage();
  const dirClass = product.change.dir === "up" ? "text-brand bg-brand-light" : product.change.dir === "down" ? "text-red-700 bg-red-50" : "text-muted bg-paper";
  const TrendIcon = product.change.dir === "up" ? ArrowUpRight : product.change.dir === "down" ? ArrowDownRight : Minus;

  return (
    <Link href={`/product/${product.slug}`} className="group rounded-2xl border border-line bg-white p-4 shadow-card transition hover:-translate-y-1 hover:border-brand/30 hover:shadow-lg sm:p-5">
      <div className="mb-5 flex items-start justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl bg-paper text-3xl">{product.image}</span>
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${dirClass}`}>
          <TrendIcon size={14} /> {Math.abs(product.change.pct).toLocaleString(language === "bn" ? "bn-BD" : "en-BD")}%
        </span>
      </div>
      <h3 className="text-lg font-bold text-ink group-hover:text-brand">{productName(product.slug, product.nameBn, language)}</h3>
      <p className="mt-1 text-sm text-muted">{unitLabel(product.unit, language)}</p>
      <div className="mt-5 flex items-end justify-between gap-2 border-t border-line pt-4">
        <span>
          <span className="block text-xs text-muted">{t(language, "todayPrice")}</span>
          <span className="mt-1 block text-lg font-extrabold text-ink">{formatTaka(product.today, language)} <span className="text-xs font-medium">{t(language, "taka")}</span></span>
        </span>
        <span className="text-xs font-semibold text-brand">{t(language, "details")} <span aria-hidden="true">→</span></span>
      </div>
    </Link>
  );
}
