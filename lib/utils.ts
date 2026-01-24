import { clsx, type ClassValue } from "clsx";
import { error } from "console";
import { twMerge } from "tailwind-merge";
import { logger } from "./logger";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatK = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

export const filterOptions = [
  {
    name: "price",
    label: "Price Range",
    options: [
      { value: { min: 10000, max: 50000 }, label: "₦10,000 - ₦50,000" },
      { value: { min: 50000, max: 100000 }, label: "₦50,000 - ₦100,000" },
      { value: { min: 500000, max: 1000000 }, label: "₦500,000 - ₦1,000,000" },
    ],
  },
  {
    name: "location",
    label: "Location",
    options: [
      { value: "lekki", label: "Lekki" },
      { value: "ikeja", label: "Ikeja" },
      { value: "ajah", label: "Ajah" },
      { value: "yaba", label: "Yaba" },
    ],
  },
  {
    name: "property_type",
    label: "Property Type",
    options: [
      { value: "apartment", label: "Apartment" },
      { value: "house", label: "House" },
    ],
  },
  {
    name: "listing_type",
    label: "Service Type",
    options: [
      { value: "sale", label: "For Sale" },
      { value: "rent", label: "For Rent" },
      { value: "Cleaning", label: "Cleaning" },
    ],
  },
];

// lib/auth.ts or utils/auth.ts
export function getTokenFromCookies(): string | null {
  // Server-side: return null (we'll handle server auth separately)
  if (typeof document === "undefined") {
    return null;
  }

  // Client-side: check cookies for token or access_token
  const cookieString = document.cookie;
  const tokenMatch = cookieString.match(/(?:^|; )\s*token=([^;]*)/);
  const accessTokenMatch = cookieString.match(
    /(?:^|; )\s*access_token=([^;]*)/
  );

  if (tokenMatch) {
    return decodeURIComponent(tokenMatch[1]);
  }
  if (accessTokenMatch) {
    return decodeURIComponent(accessTokenMatch[1]);
  }

  return null;
}

// utils/formatPrice.ts
export const formatPrice = (
  value: number | string,
  locale = "en-US"
): string => {
  if (value === null || value === undefined || value === "") return "0";

  const number =
    typeof value === "string" ? Number(value.replace(/,/g, "")) : value;

  if (Number.isNaN(number)) return "0";

  return new Intl.NumberFormat(locale).format(number);
};

export const getAllBankDetails = async () => {
    try {
      const response = await fetch("https://api.paystack.co/bank");
    const data = await response.json();
    if(!response.ok){
      throw new Error (data.message || "Failed to fetch bank details" )
    }
    return data.data;
    } catch (error) {
      logger.error(error)
    }
};  
