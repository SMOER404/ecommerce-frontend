"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"

const brands = [
  {
    id: 1,
    name: "Nike",
    logo: "https://placehold.co/100x100/222222/222222",
    href: "/brands/nike",
  },
  {
    id: 2,
    name: "Adidas",
    logo: "https://placehold.co/100x100/222222/222222",
    href: "/brands/adidas",
  },
  {
    id: 3,
    name: "Puma",
    logo: "https://placehold.co/100x100/222222/222222",
    href: "/brands/puma",
  },
  {
    id: 4,
    name: "Reebok",
    logo: "https://placehold.co/100x100/222222/222222",
    href: "/brands/reebok",
  },
  {
    id: 5,
    name: "Under Armour",
    logo: "https://placehold.co/100x100/222222/222222",
    href: "/brands/under-armour",
  },
  {
    id: 6,
    name: "New Balance",
    logo: "https://placehold.co/100x100/222222/222222",
    href: "/brands/new-balance",
  },
]

export function BrandsCarousel() {
  return (
    <div className="py-12">
      <h2 className="mb-8 text-2xl font-bold">Популярные бренды</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={brand.href}
            className="group relative flex h-24 items-center justify-center rounded-lg border bg-background p-4 transition-colors hover:bg-muted"
          >
            <div className="h-12 w-12 rounded-full bg-muted" />
          </Link>
        ))}
      </div>
    </div>
  )
} 