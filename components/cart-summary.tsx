"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { CreditCard } from "lucide-react"
import { getCartSummary } from "@/lib/cart"

// This would normally be fetched from the API
const dummyCartSummary = {
  subtotal: 389.96,
  shipping: 0,
  tax: 31.2,
  total: 421.16,
}

export default function CartSummary() {
  const [summary, setSummary] = useState<any>(null)
  const [promoCode, setPromoCode] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCartSummary = async () => {
      try {
        setLoading(true)
        const data = await getCartSummary()
        setSummary(data)
      } catch (error) {
        console.error("Error fetching cart summary:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCartSummary()
  }, [])

  const applyPromoCode = () => {
    if (!promoCode) return

    // In a real app, this would be an API call
    // await fetch('/api/cart/promo', {
    //   method: 'POST',
    //   body: JSON.stringify({ code: promoCode }),
    // })

    // For demo purposes, just apply a 10% discount
    setSummary({
      ...summary,
      discount: summary.subtotal * 0.1,
      total: summary.total - summary.subtotal * 0.1,
    })

    setPromoCode("")
  }

  if (loading) return null

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${summary.subtotal.toFixed(2)}</span>
        </div>

        {summary.discount && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-${summary.discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${summary.tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-4 mb-4">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button variant="outline" onClick={applyPromoCode}>
            Apply
          </Button>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between font-semibold text-lg mb-6">
        <span>Total</span>
        <span>${summary.total.toFixed(2)}</span>
      </div>

      <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
        <CreditCard className="mr-2 h-4 w-4" />
        Checkout
      </Button>
    </div>
  )
}

