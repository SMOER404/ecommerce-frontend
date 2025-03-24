"use client"

import * as React from "react"
import Link from "next/link"
import { useStore } from "@/shared/hooks/use-store"

const featuredProducts = [
  {
    id: "1",
    name: "Nike Air Max 270",
    price: 12999,
    image: "https://placehold.co/400x400/222222/222222",
    category: "Обувь",
    brand: "Nike",
  },
  {
    id: "2",
    name: "Adidas Ultraboost 21",
    price: 15999,
    image: "https://placehold.co/400x400/222222/222222",
    category: "Обувь",
    brand: "Adidas",
  },
  {
    id: "3",
    name: "Puma RS-X³ Puzzle",
    price: 11999,
    image: "https://placehold.co/400x400/222222/222222",
    category: "Обувь",
    brand: "Puma",
  },
  {
    id: "4",
    name: "Nike Dri-FIT Training",
    price: 3999,
    image: "https://placehold.co/400x400/222222/222222",
    category: "Одежда",
    brand: "Nike",
  },
]

export function FeaturedProducts() {
  const { addToCart } = useStore()

  return (
    <div className="py-12">
      <h2 className="mb-8 text-2xl font-bold">Популярные товары</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            className="group relative rounded-lg border bg-background p-4 transition-colors hover:bg-muted"
          >
            <Link href={`/product/${product.id}`}>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-muted" />
            </Link>
            <div className="mt-4">
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-medium">{product.name}</h3>
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {product.category} • {product.brand}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-lg font-semibold">{product.price} ₽</p>
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                      quantity: 1,
                    })
                  }
                  className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  В корзину
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 