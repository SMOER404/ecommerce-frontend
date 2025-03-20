'use client'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ProductCard } from '@/components/product-card'
import { productStore } from '@/stores/product-store'
import { Skeleton } from '@/components/ui/skeleton'

export const ProductList = observer(() => {
  useEffect(() => {
    productStore.fetchProducts()
  }, [])

  if (productStore.isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (productStore.error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">{productStore.error}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {productStore.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}) 