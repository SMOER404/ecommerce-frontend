# POIZON MARKET

Современный интернет-магазин, построенный с использованием Next.js и TypeScript. Проект использует современный стек технологий и следует лучшим практикам разработки.

## 🚀 Технологии

### Frontend

- **Next.js 14** - React фреймворк с поддержкой серверных компонентов
- **TypeScript** - для типизации и улучшения качества кода
- **Tailwind CSS** - для стилизации компонентов
- **shadcn/ui** - набор переиспользуемых компонентов
- **Formik** - для работы с формами
- **Yup** - для валидации форм
- **date-fns** - для работы с датами
- **MobX** - для управления состоянием
- **Axios** - для HTTP-запросов

### Backend

- **NestJS** - Node.js фреймворк для бэкенда
- **PostgreSQL** - основная база данных
- **TypeORM** - ORM для работы с PostgreSQL
- **JWT** - для аутентификации

## 🛠 Установка и запуск

1. Клонируйте репозиторий:

```bash
git clone https://github.com/yourusername/poizon-market.git
cd poizon-market
```

2. Установите зависимости:

```bash
npm install
```

3. Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

4. Запустите проект в режиме разработки:

```bash
npm run dev
```

5. Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
poizon-market/
├── src/
│   ├── app/                 # Страницы приложения
│   ├── components/          # React компоненты
│   │   ├── forms/          # Компоненты форм
│   │   └── ui/             # UI компоненты
│   ├── lib/                # Утилиты и конфигурация
│   ├── stores/             # MobX сторы
│   └── styles/             # Глобальные стили
├── public/                 # Статические файлы
└── scripts/               # Скрипты для генерации кода
```

## 🔧 Основные функции

- Аутентификация и авторизация
- Каталог товаров с фильтрацией
- Корзина покупок
- Оформление заказа
- Личный кабинет
- Административная панель
- Мультиязычность (русский/английский)
- Темная/светлая тема

## 📱 Адаптивный дизайн

Проект полностью адаптивен и оптимизирован для:

- Десктопных устройств
- Планшетов
- Мобильных устройств

## 🔒 Безопасность

- JWT аутентификация
- Защита от CSRF
- Валидация данных
- Безопасное хранение паролей

## 🧪 Тестирование

```bash
# Запуск unit-тестов
npm run test

# Запуск e2e-тестов
npm run test:e2e
```

## 📦 Сборка для продакшена

```bash
# Сборка проекта
npm run build

# Запуск в продакшен режиме
npm run start
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/amazing-feature`)
3. Зафиксируйте изменения (`git commit -m 'Add some amazing feature'`)
4. Отправьте изменения в репозиторий (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

## 📄 Лицензия

Этот проект распространяется под лицензией MIT. Подробности в файле [LICENSE](LICENSE).

## 👥 Команда

- [Имя разработчика](https://github.com/username) - Frontend разработчик
- [Имя разработчика](https://github.com/username) - Backend разработчик
- [Имя дизайнера](https://github.com/username) - UI/UX дизайнер

## 📞 Контакты

- Email: support@poizonmarket.com
- Телефон: +7 (XXX) XXX-XX-XX
- Адрес: г. Москва, ул. Примерная, д. 1
