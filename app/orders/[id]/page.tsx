"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { getOrder, cancelOrder } from "@/lib/orders"
import { type Order, OrderStatus } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchOrder = async () => {
      if (user) {
        try {
          setLoading(true)
          const data = await getOrder(params.id)
          setOrder(data)
        } catch (error) {
          console.error("Error fetching order:", error)
          router.push("/profile")
        } finally {
          setLoading(false)
        }
      }
    }

    fetchOrder()
  }, [user, params.id, router])

  const handleCancelOrder = async () => {
    if (!order) return

    try {
      const updatedOrder = await cancelOrder(order.id)
      setOrder(updatedOrder)
    } catch (error) {
      console.error("Error cancelling order:", error)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }

  if (!user || !order) {
    return null
  }

  const getOrderStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW:
        return "bg-blue-500"
      case OrderStatus.PROCESSING:
        return "bg-yellow-500"
      case OrderStatus.SHIPPED:
        return "bg-purple-500"
      case OrderStatus.DELIVERED:
        return "bg-green-500"
      case OrderStatus.CANCELLED:
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const canCancel = order.status === OrderStatus.NEW

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <Button variant="outline" size="sm" onClick={() => router.push("/profile")}>
          Back to Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={getOrderStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-start space-x-4">
                        <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.productVariant.product.images[0] || "/placeholder.svg"}
                            alt={item.productVariant.product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <Link
                            href={`/product/${item.productVariant.productId}`}
                            className="font-medium hover:underline"
                          >
                            {item.productVariant.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.productVariant.color}, {item.productVariant.size}
                          </p>
                          <div className="flex justify-between mt-1">
                            <span className="text-sm">Qty: {item.quantity}</span>
                            <span className="font-medium">${item.price.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {order.shippingAddress && (
                  <div>
                    <h3 className="font-medium mb-2">Shipping Address</h3>
                    <p className="text-sm">{order.shippingAddress}</p>
                  </div>
                )}

                {canCancel && (
                  <div className="pt-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Cancel Order</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will cancel your order and refund any payment.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleCancelOrder}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${(order.total * 0.92).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${(order.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>

              {order.paymentId && (
                <div className="mt-4 pt-4 border-t">
                  <h3 className="font-medium mb-2">Payment Information</h3>
                  <p className="text-sm">Payment ID: {order.paymentId}</p>
                  <p className="text-sm">
                    Status: <span className="font-medium">Paid</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

