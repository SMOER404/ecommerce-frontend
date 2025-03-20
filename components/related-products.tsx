"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// This would normally be fetched from the API
const dummyRelatedProducts = [
  {
    id: 101,
    name: "Running Shoes Pro",
    price: 119.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 102,
    name: "Casual Sneakers",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 103,
    name: "Athletic Shoes",
    price: 99.99,
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 104,
    name: "Hiking Boots",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function RelatedProducts({ productId }: { productId: string }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchRelatedProducts = async () => {
    //   const response = await fetch(`/api/products/${productId}/related`)
    //   const data = await response.json()
    //   setProducts(data)
    // }

    // Simulate API call
    setProducts(dummyRelatedProducts)
  }, [productId])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map((product: any) => (
        <Card key={product.id} className="overflow-hidden">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
            <div className="font-semibold">${product.price.toFixed(2)}</div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex justify-between">
            <Link href={`/product/${product.id}`}>
              <Button variant="outline" size="sm">
                View
              </Button>
            </Link>
            <Button size="icon" className="h-8 w-8 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground">
              <ShoppingCart className="h-4 w-4" />
              <span className="sr-only">Add to cart</span>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

