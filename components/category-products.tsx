"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Product } from "@/lib/products";
import { ProductGrid } from "@/components/product-grid";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

type SortOrder = "default" | "low" | "high";

export function CategoryProducts({ products }: { products: Product[] }) {
  const { language } = useLanguage();
  const [sort, setSort] = useState<SortOrder>("default");
  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "low") return list.sort((a, b) => a.today - b.today);
    if (sort === "high") return list.sort((a, b) => b.today - a.today);
    return list;
  }, [products, sort]);

  return (
    <>
      <label className="mb-5 inline-flex items-center gap-2 text-sm text-muted">
        {t(language, "sort")}
        <span className="relative">
          <select value={sort} onChange={(event) => setSort(event.target.value as SortOrder)} className="appearance-none rounded-lg border border-line bg-white py-2 pl-3 pr-9 font-semibold text-ink outline-none focus:border-brand">
            <option value="default">{t(language, "defaultSort")}</option>
            <option value="low">{t(language, "priceLowHigh")}</option>
            <option value="high">{t(language, "priceHighLow")}</option>
          </select>
          <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted" />
        </span>
      </label>
      <ProductGrid products={sorted} />
    </>
  );
}
