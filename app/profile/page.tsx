"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { getOrders } from "@/lib/orders"
import { type Order, OrderStatus } from "@/types/order"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          setLoading(true)
          const data = await getOrders()
          setOrders(data)
        } catch (error) {
          console.error("Error fetching orders:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchOrders()
  }, [user])

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }

  if (!user) {
    return null // Will redirect in useEffect
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                  <p className="text-lg">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                  <p className="text-lg">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Account Type</h3>
                  <p className="text-lg capitalize">{user.role}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline">Edit Profile</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
                  <Button onClick={() => router.push("/catalog")}>Start Shopping</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Order #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <Badge className={getOrderStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span>
                              {item.quantity} x {item.productVariant.product.name} ({item.productVariant.color},{" "}
                              {item.productVariant.size})
                            </span>
                            <span>${item.price.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t mt-4 pt-4 flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-semibold">${order.total.toFixed(2)}</span>
                      </div>

                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/orders/${order.id}`)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

