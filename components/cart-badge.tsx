'use client'

import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cartStore } from '@/stores/cart-store'

export const CartBadge = observer(() => {
  useEffect(() => {
    cartStore.fetchCart()
  }, [])

  return (
    <Button variant="ghost" size="icon" className="rounded-full relative">
      <ShoppingCart className="h-5 w-5" />
      {cartStore.totalItems > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
          {cartStore.totalItems}
        </span>
      )}
      <span className="sr-only">Корзина</span>
    </Button>
  )
}) 