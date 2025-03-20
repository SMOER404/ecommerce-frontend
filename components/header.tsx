"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, User, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/auth-provider"
import { logout } from "@/lib/auth"
import { CartBadge } from "@/components/cart-badge"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Открыть меню</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium">
                  Главная
                </Link>
                <Link href="/catalog" className="text-lg font-medium">
                  Каталог
                </Link>
                <Link href="/brands" className="text-lg font-medium">
                  Бренды
                </Link>
                <Link href="/about" className="text-lg font-medium">
                  О нас
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold text-xl tracking-tight">
              <span className="text-primary">MODERN</span>
              <span className="text-accent">SHOP</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              Главная
            </Link>
            <Link href="/catalog" className="text-sm font-medium transition-colors hover:text-primary">
              Каталог
            </Link>
            <Link href="/brands" className="text-sm font-medium transition-colors hover:text-primary">
              Бренды
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
              О нас
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Переключить тему</span>
          </Button>

          <Link href="/cart">
            <CartBadge />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Профиль</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await logout()
                  window.location.href = "/"
                }}
              >
                Выйти
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Войти
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

