"use client";

import { Product } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { useLanguage } from "@/components/language-provider";
import { t } from "@/lib/i18n";

export function ProductGrid({ products }: { products: Product[] }) {
  const { language } = useLanguage();
  if (!products.length) {
    return <div className="rounded-2xl border border-dashed border-line py-16 text-center text-muted">{t(language, "noProductsInCategory")}</div>;
  }
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>;
}
