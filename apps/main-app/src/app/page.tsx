'use client';

import React from "react"
import { BrandsCarousel } from "@/widgets/brands-carousel"
import { FeaturedProducts } from "@/widgets/featured-products"
import { Typography } from '@/shared/ui/typography';

export default async function Home() {
  return (
    <React.Fragment>
      <div className="container mx-auto px-4">
        <BrandsCarousel />
        <FeaturedProducts />
      </div>
    </React.Fragment>
  )
} 