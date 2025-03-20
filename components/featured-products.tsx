"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { productService } from "@/lib/services/product-service"
import { cartService } from "@/lib/services/cart-service"
import type { Product } from "@/types/product"
import { toast } from "@/components/ui/use-toast"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const products = await productService.getFeaturedProducts()
        setProducts(products)
      } catch (error) {
        console.error("Ошибка при загрузке товаров:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = async (productId: string) => {
    try {
      const product = products.find((p) => p.id === productId)
      if (product && product.variants.length > 0) {
        await cartService.addToCart(product.variants[0].id, 1)
        toast({
          title: "Добавлено в корзину",
          description: `${product.name} добавлен в вашу корзину.`,
        })
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить товар в корзину. Пожалуйста, попробуйте снова.",
        variant: "destructive",
      })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Популярные товары</h2>
        <Link href="/catalog" className="text-sm font-medium text-accent hover:underline">
          Смотреть все
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="relative aspect-square">
                <Skeleton className="h-full w-full" />
              </div>
              <CardContent className="p-4">
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-4 w-1/3" />
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {products.map((product) => (
            <motion.div key={product.id} variants={item}>
              <Card className="overflow-hidden group">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg?height=400&width=400"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Добавить в избранное</span>
                  </Button>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-muted-foreground mb-1">{product.brand.name}</div>
                  <h3 className="font-medium mb-1 line-clamp-1">{product.name}</h3>
                  <div className="font-semibold">{product.variants[0]?.price.toFixed(2) || "Н/Д"} ₽</div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <Link href={`/product/${product.id}`}>
                    <Button variant="outline" size="sm">
                      Подробнее
                    </Button>
                  </Link>
                  <Button
                    size="icon"
                    className="rounded-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => handleAddToCart(product.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span className="sr-only">Добавить в корзину</span>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
}

