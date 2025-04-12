'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/shared/components/auth-provider';
import { useStore } from '@/shared/hooks/use-store';

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { cart } = useStore();

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">POIZON MARKET</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/catalog"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/catalog' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Каталог
            </Link>
            <Link
              href="/brands"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/brands' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Бренды
            </Link>
            <Link
              href="/about"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/about' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              О нас
            </Link>
            <Link
              href="/contact"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === '/contact' ? 'text-foreground' : 'text-foreground/60'
              }`}
            >
              Контакты
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/cart" className="relative flex items-center space-x-2 text-sm font-medium">
            <span>Корзина</span>
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                {cartItemsCount}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link
                href="/profile"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                {user.name}
              </Link>
              <button
                onClick={() => logout()}
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Выйти
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Войти
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium transition-colors hover:text-foreground/80"
              >
                Регистрация
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
