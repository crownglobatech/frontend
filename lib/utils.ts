import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn (...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatK = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}

export const filterOptions = [
 {
  name: 'price',
  label: 'Price Range',
  options: [
    { value: { min: 10000, max: 50000 }, label: '₦10,000 - ₦50,000' },
    { value: { min: 50000, max: 100000 }, label: '₦50,000 - ₦100,000' },
    { value: { min: 500000, max: 1000000 }, label: '₦500,000 - ₦1,000,000' }
  ]
}
,
  {
    name: 'location',
    label: 'Location',
    options: [
      { value: 'lekki', label: 'Lekki' },
      { value: 'ikeja', label: 'Ikeja' },
      { value: 'ajah', label: 'Ajah' },
      { value: 'yaba', label: 'Yaba' }
    ]
  },
  {
    name: 'property_type',
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
      { value: 'rent', label: 'For Rent' },
      { value: 'Cleaning', label: 'Cleaning' }
    ]
  }
  // {
  //   name: 'rating',
  //   label: 'Rating',
  //   options: [
  //     { value: '5', label: '5 Stars' },
  //     { value: '4', label: '4 Stars & Up' }
  //   ]
  // }
]
