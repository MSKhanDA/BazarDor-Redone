import { ProductSkeleton } from "@/components/product-skeleton";

export default function CategoryLoading() {
  return <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6"><div className="mb-7 h-9 w-56 animate-pulse rounded bg-paper" /><ProductSkeleton /></div>;
}
