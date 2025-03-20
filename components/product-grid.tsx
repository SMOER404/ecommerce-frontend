"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useSearchParams } from "next/navigation"
import { getProducts, type ProductQueryParams } from "@/lib/products"

// This would normally be fetched from the API
const dummyProducts = Array(12)
  .fill(0)
  .map((_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    price: 49.99 + i * 10,
    image: "/placeholder.svg?height=400&width=400",
    category: i % 3 === 0 ? "shoes" : i % 3 === 1 ? "clothing" : "accessories",
    brand: i % 4 === 0 ? "BrandX" : i % 4 === 1 ? "BrandY" : i % 4 === 2 ? "BrandZ" : "BrandA",
  }))

export default function ProductGrid() {
  const searchParams = useSearchParams()
  const category = searchParams.get("category")
  const brand = searchParams.get("brand")

  const [products, setProducts] = useState([])

  // Simulate API fetch with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params: ProductQueryParams = {}

        if (category) {
          params.categoryId = category
        }

        if (brand) {
          params.brandId = brand
        }

        const response = await getProducts(params)
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [category, brand])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden group">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-1">{product.brand}</div>
            <h3 className="font-medium mb-1">{product.name}</h3>
            <div className="font-semibold">${product.price.toFixed(2)}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Link href={`/product/${product.id}`}>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </Link>
            <Button size="icon" className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

