import { Language } from "@/lib/i18n";

export const API_BASE_URL =
  process.env.BAZARDOR_API_URL ?? "https://openapi.programming-hero.com/api/bazardor";

export type ProductChange = {
  dir: "up" | "down" | "flat";
  pct: number;
};

export type MarketPrice = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: ProductChange;
  markets: MarketPrice[];
};

export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

async function fetchFromApi<T>(path: string): Promise<T> {
  const candidates = [
    API_BASE_URL,
    "https://api.api-store.workers.dev/api/bazardor",
    "https://api.abcz.workers.dev/api/bazardor",
  ].filter((value, index, all) => all.indexOf(value) === index);
  let lastError: Error | undefined;

  for (const baseUrl of candidates) {
    try {
      const response = await fetch(`${baseUrl}${path}`, { next: { revalidate: 300 } });
      if (!response.ok) throw new Error(`BazarDor API returned ${response.status}`);
      return (await response.json()) as T;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown API error");
    }
  }

  throw new Error(`Could not load data from BazarDor API: ${lastError?.message ?? "unknown error"}`);
}

export async function getProducts(category?: string): Promise<Product[]> {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return fetchFromApi<Product[]>(`/products${query}`);
}

export async function getCategories(): Promise<Category[]> {
  return fetchFromApi<Category[]>("/categories");
}

export function formatTaka(amount: number, language: Language = "bn"): string {
  return new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD", { maximumFractionDigits: 0 }).format(amount);
}

export function unitLabel(unit: string, language: Language = "bn"): string {
  const labels: Record<string, { bn: string; en: string }> = {
    kg: { bn: "প্রতি কেজি", en: "per kg" },
    liter: { bn: "প্রতি লিটার", en: "per litre" },
    litre: { bn: "প্রতি লিটার", en: "per litre" },
    dozen: { bn: "প্রতি ডজন", en: "per dozen" },
    piece: { bn: "প্রতি পিস", en: "per piece" },
    pcs: { bn: "প্রতি পিস", en: "per piece" },
  };
  const label = labels[unit.toLowerCase()];
  if (label) return label[language];
  return language === "bn" ? `প্রতি ${unit}` : `per ${unit}`;
}
