import { ClassValue } from 'clsx';

type WithClassName = {
  className?: string;
};

declare function cn(...inputs: ClassValue[]): string;
declare function formatPrice(price: number): string;

declare const example: () => string;

export { type WithClassName, cn, example, formatPrice };
