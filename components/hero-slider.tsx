"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// This would normally be fetched from the API
const slides = [
  {
    id: 1,
    title: "New Collection",
    description: "Discover our latest arrivals with unique designs",
    image: "/placeholder.svg?height=600&width=1200",
    link: "/catalog?collection=new",
  },
  {
    id: 2,
    title: "Premium Quality",
    description: "Handcrafted items with attention to detail",
    image: "/placeholder.svg?height=600&width=1200",
    link: "/catalog?collection=premium",
  },
  {
    id: 3,
    title: "Limited Edition",
    description: "Exclusive items available for a limited time",
    image: "/placeholder.svg?height=600&width=1200",
    link: "/catalog?collection=limited",
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  const nextSlide = () => {
    setCurrent(current === slides.length - 1 ? 0 : current + 1)
  }

  const prevSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [current])

  return (
    <div className="relative h-[500px] md:h-[600px] overflow-hidden rounded-xl my-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image || "/placeholder.svg"}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-8 md:px-16">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-5xl font-bold text-white mb-4"
            >
              {slides[current].title}
            </motion.h2>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-xl text-white/80 mb-8 max-w-md"
            >
              {slides[current].description}
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link href={slides[current].link}>
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">Shop Now</Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6 text-white" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 backdrop-blur-sm hover:bg-background/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6 text-white" />
        <span className="sr-only">Next slide</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 w-2 rounded-full ${index === current ? "bg-accent" : "bg-white/50"}`}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

