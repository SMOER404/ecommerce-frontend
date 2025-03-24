import { ClassValue } from 'clsx';

declare const cn: (...inputs: ClassValue[]) => string;

declare const formatPrice: (price: number) => string;
declare const formatDate: (date: Date) => string;

declare const isValidEmail: (email: string) => boolean;
declare const isValidPassword: (password: string) => boolean;
declare const isValidPhone: (phone: string) => boolean;

export { cn, formatDate, formatPrice, isValidEmail, isValidPassword, isValidPhone };
