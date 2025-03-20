'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/skeleton'

interface Brand {
  _id: string
  name: string
  logo: string
}

export default function BrandsCarousel() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/api/brands')
        const data = await response.json()
        setBrands(data)
      } catch (error) {
        console.error('Ошибка при загрузке брендов:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBrands()
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Наши бренды</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-4">
              <Skeleton className="h-16 w-full" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {brands.map((brand) => (
            <motion.div key={brand._id} variants={item}>
              <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={120}
                  height={60}
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  )
} 