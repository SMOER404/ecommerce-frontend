"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { UserRole } from "@/types/user"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { getOrders } from "@/lib/orders"
import { type Order, OrderStatus } from "@/types/order"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { updateOrderStatus } from "@/lib/orders"

export default function AdminPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
    } else if (!authLoading && user && user.role !== UserRole.ADMIN) {
      router.push("/")
    }
  }, [user, authLoading, router])

  useEffect(() => {
    const fetchOrders = async () => {
      if (user && user.role === UserRole.ADMIN) {
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

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      const updatedOrder = await updateOrderStatus(orderId, status)
      setOrders(orders.map((order) => (order.id === orderId ? updatedOrder : order)))
    } catch (error) {
      console.error("Error updating order status:", error)
    }
  }

  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-1/3 mb-6" />
        <Skeleton className="h-64 w-full rounded-lg" />
      </div>
    )
  }

  if (!user || user.role !== UserRole.ADMIN) {
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Order Management</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
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
                  <p className="text-muted-foreground">No orders found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between mb-4">
                        <div>
                          <p className="font-medium">Order #{order.id.substring(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()} - Customer: {order.userId}
                          </p>
                        </div>
                        <div className="mt-2 sm:mt-0 flex items-center gap-2">
                          <Badge className={getOrderStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                          <Select
                            defaultValue={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value)}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={OrderStatus.NEW}>New</SelectItem>
                              <SelectItem value={OrderStatus.PROCESSING}>Processing</SelectItem>
                              <SelectItem value={OrderStatus.SHIPPED}>Shipped</SelectItem>
                              <SelectItem value={OrderStatus.DELIVERED}>Delivered</SelectItem>
                              <SelectItem value={OrderStatus.CANCELLED}>Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
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

        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>Manage your product catalog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Product management interface coming soon.</p>
                <Button onClick={() => router.push("/admin/products/new")}>Add New Product</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">User management interface coming soon.</p>
                <Button onClick={() => router.push("/admin/users")}>View All Users</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

