"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ShoppingCart, Heart, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PresentationControls, Environment } from "@react-three/drei"
import { Suspense } from "react"

// This would normally be fetched from the API
const getProductDetails = (id: string) => {
  return {
    id,
    name: "Premium Sneakers X3",
    price: 129.99,
    description:
      "Experience ultimate comfort and style with our Premium Sneakers X3. Featuring advanced cushioning technology and breathable materials for all-day wear.",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    colors: [
      { id: "black", name: "Black", hex: "#000000" },
      { id: "white", name: "White", hex: "#FFFFFF" },
      { id: "red", name: "Red", hex: "#FF0000" },
    ],
    sizes: [
      { id: "7", name: "US 7", price: 129.99 },
      { id: "8", name: "US 8", price: 129.99 },
      { id: "9", name: "US 9", price: 139.99 },
      { id: "10", name: "US 10", price: 139.99 },
      { id: "11", name: "US 11", price: 149.99 },
    ],
    rating: 4.8,
    reviewCount: 124,
    features: ["Breathable mesh upper", "Responsive cushioning", "Durable rubber outsole", "Lightweight design"],
    has3DModel: true,
  }
}

// Simple 3D model component
function Model() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#AFEB0F" />
    </mesh>
  )
}

export default function ProductDetails({ productId }: { productId: string }) {
  const [product, setProduct] = useState<any>(null)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [currentPrice, setCurrentPrice] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [view3D, setView3D] = useState(false)

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchProduct = async () => {
    //   const response = await fetch(`/api/products/${productId}`)
    //   const data = await response.json()
    //   setProduct(data)
    // }

    const data = getProductDetails(productId)
    setProduct(data)
    setSelectedColor(data.colors[0].id)
    setSelectedSize(data.sizes[0].id)
    setCurrentPrice(data.sizes[0].price)
  }, [productId])

  if (!product) return null

  const handleSizeChange = (size: string) => {
    setSelectedSize(size)
    const sizeObj = product.sizes.find((s: any) => s.id === size)
    setCurrentPrice(sizeObj.price)
  }

  const handleAddToCart = () => {
    // In a real app, this would be an API call
    console.log("Adding to cart:", {
      productId,
      color: selectedColor,
      size: selectedSize,
      price: currentPrice,
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        {view3D ? (
          <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 backdrop-blur-sm">
            <Canvas>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <PresentationControls
                global
                zoom={0.8}
                rotation={[0, -Math.PI / 4, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
              >
                <Suspense fallback={null}>
                  <Model />
                </Suspense>
              </PresentationControls>
              <OrbitControls />
              <Environment preset="city" />
            </Canvas>
          </div>
        ) : (
          <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 backdrop-blur-sm">
            <Image
              src={product.images[currentImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentImage(index)
                  setView3D(false)
                }}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                  currentImage === index && !view3D ? "border-accent" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}

            {product.has3DModel && (
              <button
                onClick={() => setView3D(true)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 flex items-center justify-center bg-muted/30 backdrop-blur-sm ${
                  view3D ? "border-accent" : "border-transparent"
                }`}
              >
                <span className="text-xs font-medium">3D View</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"
                    }`}
                  />
                ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground">{product.description}</p>

        <div>
          <h3 className="font-medium mb-2">Color</h3>
          <div className="flex space-x-2">
            {product.colors.map((color: any) => (
              <button
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedColor === color.id ? "ring-2 ring-accent ring-offset-2" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Size</h3>
          <RadioGroup value={selectedSize} onValueChange={handleSizeChange} className="flex flex-wrap gap-2">
            {product.sizes.map((size: any) => (
              <div key={size.id} className="flex items-center space-x-2">
                <RadioGroupItem value={size.id} id={`size-${size.id}`} className="peer sr-only" />
                <Label
                  htmlFor={`size-${size.id}`}
                  className="flex h-10 w-16 cursor-pointer items-center justify-center rounded-md border border-muted bg-background text-center text-sm font-medium ring-offset-background transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 peer-data-[state=checked]:border-accent peer-data-[state=checked]:bg-accent/10 peer-data-[state=checked]:text-accent-foreground"
                >
                  {size.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div className="pt-4">
          <div className="text-2xl font-bold mb-4">${currentPrice.toFixed(2)}</div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAddToCart} className="bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              Add to Wishlist
            </Button>
          </div>
        </div>

        <Tabs defaultValue="details">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="pt-4">
            <p className="text-sm text-muted-foreground">
              The Premium Sneakers X3 are designed for both style and performance. Made with high-quality materials and
              expert craftsmanship, these sneakers provide exceptional comfort and durability for everyday wear.
            </p>
          </TabsContent>
          <TabsContent value="features" className="pt-4">
            <ul className="space-y-2">
              {product.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 mr-2 mt-0.5 text-accent" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="reviews" className="pt-4">
            <p className="text-sm text-muted-foreground">
              Customer reviews will be displayed here. In a real application, these would be loaded from the API.
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

