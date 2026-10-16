import { ProductSkeleton } from "@/components/product-skeleton";

export default function Loading() {
  return <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="mb-7 h-8 w-48 animate-pulse rounded bg-paper" /><ProductSkeleton /></div>;
}
