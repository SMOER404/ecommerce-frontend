import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-sm text-muted-foreground">
              Современная платформа электронной коммерции с уникальным дизайном и премиальными товарами.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/catalog?category=shoes" className="text-muted-foreground hover:text-foreground">
                  Обувь
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=clothing" className="text-muted-foreground hover:text-foreground">
                  Одежда
                </Link>
              </li>
              <li>
                <Link href="/catalog?category=accessories" className="text-muted-foreground hover:text-foreground">
                  Аксессуары
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Служба поддержки</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Связаться с нами
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-foreground">
                  Доставка
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-foreground">
                  Возврат и обмен
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Мы в соцсетях</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground">
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Modern Shop. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}

