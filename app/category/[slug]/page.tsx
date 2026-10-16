import { notFound } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { getCategories, getProducts } from "@/lib/products";
import { CategoryProducts } from "@/components/category-products";
import { getServerLanguage } from "@/lib/server-language";
import { categoryName, t } from "@/lib/i18n";

export const dynamicParams = true;

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, products, language] = await Promise.all([getCategories(), getProducts(slug), getServerLanguage()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category || !products.length) notFound();

  return (
    <section className="mx-auto min-h-[60vh] max-w-6xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-bold text-brand">{t(language, "categoryHeading")}</p><h1 className="mt-2 text-3xl font-extrabold">{category.icon} {categoryName(category.slug, category.nameBn, language)}</h1><p className="mt-2 text-sm text-muted">{products.length.toLocaleString(language === "bn" ? "bn-BD" : "en-BD")} {t(language, "currentPricesCount")}</p></div>
        <span className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm text-muted">{t(language, "sort")} <ChevronDown size={16} /></span>
      </div>
      <div className="mt-8"><CategoryProducts products={products} /></div>
    </section>
  );
}
