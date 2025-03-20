import { Suspense } from "react"
import ProductDetails from "@/components/product-details"
import RelatedProducts from "@/components/related-products"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails productId={params.id} />
      </Suspense>

      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">You might also like</h2>
        <Suspense fallback={<RelatedProductsSkeleton />}>
          <RelatedProducts productId={params.id} />
        </Suspense>
      </div>
    </div>
  )
}

function ProductDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Skeleton className="aspect-square rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
        <div className="space-y-2 pt-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </div>
  )
}

function RelatedProductsSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square rounded-lg" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/3" />
          </div>
        ))}
    </div>
  )
}

