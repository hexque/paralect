import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isValidRange(value: string) {
  if (value.includes('-')) {
    const [start, end] = value.split('-').map((num) => parseInt(num, 10));
    return start < end;
  }

  return true;
}
