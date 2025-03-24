import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// src/classNames.ts
var cn = (...inputs) => {
  return twMerge(clsx(inputs));
};

// src/format.ts
var formatPrice = (price) => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB"
  }).format(price);
};
var formatDate = (date) => {
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
};

// src/validation.ts
var isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
var isValidPassword = (password) => {
  return password.length >= 8;
};
var isValidPhone = (phone) => {
  const phoneRegex = /^\+?[1-9]\d{10,14}$/;
  return phoneRegex.test(phone);
};

export { cn, formatDate, formatPrice, isValidEmail, isValidPassword, isValidPhone };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map