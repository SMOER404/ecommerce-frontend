import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import ProductFilters from "@/components/product-filters"
import { Skeleton } from "@/components/ui/skeleton"

export default function CatalogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Product Catalog</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        <Suspense fallback={<FiltersSkeleton />}>
          <ProductFilters />
        </Suspense>

        <div>
          <Suspense fallback={<ProductGridSkeleton />}>
            <ProductGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
    </div>
  )
}

function FiltersSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-24" />
      <div className="space-y-2">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center space-x-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
      </div>
    </div>
  )
}

