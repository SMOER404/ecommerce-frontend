import BrandsCarousel from "@/components/brands-carousel"
import FeaturedProducts from "@/components/featured-products"

export default async function Home() {
  return (
    <div className="container mx-auto px-4">
      <BrandsCarousel />
      <FeaturedProducts />
    </div>
  )
}

