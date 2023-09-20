import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toBase64(inputString:string) {
  return Buffer.from(inputString).toString('base64');
}

// Function to convert base64 to a string
export function fromBase64(base64String:string) {
  return Buffer.from(base64String, 'base64').toString();
}