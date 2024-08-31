import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}


export const colors = [
  "bg-green-300 text-black font-semibold border-[2px] border-green-700",
  "bg-orange-300 text-black font-semibold border-[2px] border-orange-700",
  "bg-pink-300 text-black  font-semibold border-[2px] border-pink-700",
  "bg-sky-300 text-black font-semibold border-[2px] border-sky-700",

];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color]
  }
  return colors[0]
}
