import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `${price} ر.س`;
}

export const productTypes = {
  ebook: "كتاب إلكتروني",
  template: "قالب"
};

export function generateOrderNumber(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function calculateOrderTotal(subtotal: number): {
  subtotal: number;
  tax: number;
  total: number;
} {
  const tax = subtotal * 0.15; // 15% tax
  const total = subtotal + tax;
  
  return {
    subtotal,
    tax,
    total
  };
}

export function getOrderStatusText(status: string): string {
  switch (status) {
    case 'pending':
      return 'قيد المعالجة';
    case 'completed':
      return 'مكتمل';
    case 'cancelled':
      return 'ملغى';
    default:
      return 'غير معروف';
  }
}

export function getRandomDate(days: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}
