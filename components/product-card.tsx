'use client'

import Image from 'next/image'
import Link from 'next/link'
import { observer } from 'mobx-react-lite'
import { Button } from '@/components/ui/button'
import { cartStore } from '@/stores/cart-store'

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    image: string
  }
}

export const ProductCard = observer(({ product }: ProductCardProps) => {
  const handleAddToCart = () => {
    cartStore.addToCart(product.id)
  }

  return (
    <div className="group relative">
      <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <Link href={`/products/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.price} ₽</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleAddToCart}
          disabled={cartStore.isLoading}
        >
          В корзину
        </Button>
      </div>
    </div>
  )
}) 