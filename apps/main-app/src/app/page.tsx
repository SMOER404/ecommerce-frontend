'use client';

import React from 'react';
import { BrandsCarousel } from '@/widgets/brands-carousel';
import { FeaturedProducts } from '@/widgets/featured-products';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <BrandsCarousel />
      <FeaturedProducts />
    </div>
  );
}
