"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// This would normally be fetched from the API
const categories = [
  { id: "shoes", name: "Shoes" },
  { id: "clothing", name: "Clothing" },
  { id: "accessories", name: "Accessories" },
]

const brands = [
  { id: "BrandX", name: "Brand X" },
  { id: "BrandY", name: "Brand Y" },
  { id: "BrandZ", name: "Brand Z" },
  { id: "BrandA", name: "Brand A" },
]

export default function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const currentCategory = searchParams.get("category")
  const currentBrand = searchParams.get("brand")

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (categoryId === currentCategory) {
      params.delete("category")
    } else {
      params.set("category", categoryId)
    }

    router.push(`/catalog?${params.toString()}`)
  }

  const handleBrandChange = (brandId: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (brandId === currentBrand) {
      params.delete("brand")
    } else {
      params.set("brand", brandId)
    }

    router.push(`/catalog?${params.toString()}`)
  }

  const clearAllFilters = () => {
    router.push("/catalog")
  }

  const Filters = () => (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">Filters</h3>
        {(currentCategory || currentBrand) && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters} className="h-8 text-xs">
            Clear all
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={["categories", "brands"]} className="w-full">
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={currentCategory === category.id}
                    onCheckedChange={() => handleCategoryChange(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm font-normal cursor-pointer">
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`brand-${brand.id}`}
                    checked={currentBrand === brand.id}
                    onCheckedChange={() => handleBrandChange(brand.id)}
                  />
                  <Label htmlFor={`brand-${brand.id}`} className="text-sm font-normal cursor-pointer">
                    {brand.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )

  return (
    <>
      {/* Desktop filters */}
      <div className="hidden md:block">
        <Filters />
      </div>

      {/* Mobile filters */}
      <div className="md:hidden">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="py-4">
              <Filters />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}

