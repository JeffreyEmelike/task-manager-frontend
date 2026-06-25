// cn() merges Tailwind classes intelligently
// Without it: "px-4 px-8" would keep both - with it: "px-8" wins
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
