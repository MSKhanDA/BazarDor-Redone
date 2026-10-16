export function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="পণ্য লোড হচ্ছে">
      {Array.from({ length: 8 }, (_, index) => (
        <div key={index} className="h-56 animate-pulse rounded-2xl border border-line bg-paper p-5">
          <div className="h-14 w-14 rounded-2xl bg-gray-200" />
          <div className="mt-6 h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-3 h-3 w-1/3 rounded bg-gray-200" />
          <div className="mt-8 h-8 w-1/2 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
