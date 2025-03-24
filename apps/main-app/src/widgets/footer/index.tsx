"use client"

import * as React from "react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold">О нас</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  О компании
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground">
                  Вакансии
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-sm text-muted-foreground hover:text-foreground">
                  Пресс-центр
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Помощь</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                  Часто задаваемые вопросы
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="text-sm text-muted-foreground hover:text-foreground">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/payment" className="text-sm text-muted-foreground hover:text-foreground">
                  Оплата
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-muted-foreground hover:text-foreground">
                  Возврат
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Правовая информация</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                  Условия использования
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground">
                  Политика использования файлов cookie
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Контакты</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Связаться с нами
                </Link>
              </li>
              <li>
                <a href="tel:+78001234567" className="text-sm text-muted-foreground hover:text-foreground">
                  8 (800) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@poizonmarket.com" className="text-sm text-muted-foreground hover:text-foreground">
                  info@poizonmarket.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} POIZON MARKET. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
} 