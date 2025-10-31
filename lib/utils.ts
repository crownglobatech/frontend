import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// /app/(store)/customer/components/filterOptions.ts

export const filterOptions = [
  {
    name: 'price',
    label: 'Price Range',
    options: [
      { value: '10000-50000', label: '₦10,000 - ₦50,000' },
      { value: '50000-100000', label: '₦50,000 - ₦100,000' },
      { value: '500000-1000000', label: '₦500,000 - ₦1,000,000' }
    ]
  },
  {
    name: 'state',
    label: 'Location',
    options: [
      { value: 'lekki', label: 'Lekki' },
      { value: 'ikeja', label: 'Ikeja' },
      { value: 'ajah', label: 'Ajah' },
      { value: 'yaba', label: 'Yaba' }
    ]
  },
  {
    name: 'propertyType',
    label: 'Property Type',
    options: [
      { value: 'apartment', label: 'Apartment' },
      { value: 'house', label: 'House' }
    ]
  },
  {
    name: 'listing_type',
    label: 'Service Type',
    options: [
      { value: 'sale', label: 'For Sale' },
      { value: 'rent', label: 'For Rent' }
    ]
  },
  // {
  //   name: 'rating',
  //   label: 'Rating',
  //   options: [
  //     { value: '5', label: '5 Stars' },
  //     { value: '4', label: '4 Stars & Up' }
  //   ]
  // }
]
