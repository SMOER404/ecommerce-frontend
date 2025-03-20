"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cartService } from "@/lib/services/cart-service"
import type { CartItem } from "@/types/cart"
import { toast } from "@/components/ui/use-toast"

export default function CartItems() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true)
        const items = await cartService.getCart()
        setCartItems(items)
      } catch (error) {
        console.error("Error fetching cart items:", error)
        toast({
          title: "Error",
          description: "Failed to load cart items. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    try {
      await cartService.updateCartItem(itemId, newQuantity)
      setCartItems(cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    } catch (error) {
      console.error("Error updating cart item:", error)
      toast({
        title: "Error",
        description: "Failed to update item quantity. Please try again.",
        variant: "destructive",
      })
    }
  }

  const removeItem = async (itemId: string) => {
    try {
      await cartService.removeCartItem(itemId)
      setCartItems(cartItems.filter((item) => item.id !== itemId))
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      })
    } catch (error) {
      console.error("Error removing cart item:", error)
      toast({
        title: "Error",
        description: "Failed to remove item. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) return null

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/catalog">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {cartItems.map((item) => (
        <div key={item.id} className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative h-24 w-24 rounded-md overflow-hidden">
            <Image
              src={item.productVariant.product.images[0] || "/placeholder.svg?height=200&width=200"}
              alt={item.productVariant.product.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between">
              <div>
                <h3 className="font-medium">
                  <Link href={`/product/${item.productVariant.productId}`} className="hover:underline">
                    {item.productVariant.product.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.productVariant.color} / {item.productVariant.size}
                </p>
              </div>
              <div className="text-right mt-2 sm:mt-0">
                <div className="font-semibold">${item.productVariant.price.toFixed(2)}</div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-r-none"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                  className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-l-none"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-muted-foreground"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

