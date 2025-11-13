'use client'
import { filterOptions } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import Image from 'next/image'
import { useState } from 'react'

interface Props {
  currentCategory: string
  setCategory: (category: string) => void
  totalResults: number | null
}
export default function CustomerHeader ({ setCategory, totalResults,currentCategory }: Props) {
  const [filters, setFilters] = useState<Record<string, string>>({})

  const handleFilterChange = (name: string, value: string) => {
    if (!value) {
      setFilters(prev => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    } else {
      setFilters(prev => ({
        ...prev,
        [name]: value
      }))
    }

    console.log('Updated filters:', { ...filters, [name]: value })
  }

  return (
    <div>
      {/* --- Top Bar --- */}
      <div className='flex justify-between gap-[50px] bg-white shadow-sm px-6 py-4'>
        <div className='flex gap-2 w-full'>
          <select className='px-3 py-2 border border-gray-300 rounded-sm text-[12px]'>
            <option value=''>All Nigeria</option>
            <option value='oyo'>Oyo</option>
            <option value='plateau'>Plateau</option>
          </select>

          <input
            type='text'
            placeholder='Search for homes and services'
            className='px-4 py-2 border border-gray-300 rounded-sm w-full text-[12px]'
          />
        </div>

        <div className='flex flex-row-reverse items-center gap-4'>
          <Image
            src='/user.png'
            alt='profile'
            height={40}
            width={40}
            className='shadow-md rounded-full cursor-pointer'
          />
          <Image
            src='/notify.png'
            alt='notifications'
            height={40}
            width={40}
            className='shadow-md rounded-full cursor-pointer'
          />
        </div>
      </div>

      {/* --- Category Navigation --- */}
      <div className='z-[50] relative flex flex-col bg-white px-6 overflow-visible'>
        <div className='flex justify-between py-2 border-gray-300 border-b'>
          <div className='flex items-center gap-6'>
            {[
              { key: 'all', label: 'All Listings' },
              { key: 'buy-homes', label: 'Buy Homes' },
              { key: 'rent-homes', label: 'Rent Homes' },
              { key: 'allied-services', label: 'Allied Services' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setCategory(item.key)}
                className={`font-medium text-sm transition cursor-pointer ${currentCategory === item.key ? 'text-[var(--primary-color)]' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className='flex items-center gap-6'>
            <span className='flex items-center gap-1.5 font-bold text-gray-800 text-sm cursor-pointer'>
              Filters
              <span className='flex justify-center items-center bg-blue-600 rounded-full w-5 h-5 font-bold text-white text-xs'>
                {Object.keys(filters).length}
              </span>
            </span>
            <span className='hover:opacity-80 font-bold text-gray-800 text-sm cursor-pointer'>
              Sorting
            </span>
          </div>
        </div>

        {/* --- Dropdown Filters --- */}
        <div className='relative flex flex-wrap gap-4 mt-2 overflow-visible'>
          {filterOptions.map(option => (
            <div key={option.name} className='relative w-[150px]'>
              <Select
                value={filters[option.name] || ''}
                onValueChange={val => handleFilterChange(option.name, val)}
              >
                <SelectTrigger className='w-full font-semibold text-[12px] text-gray-800'>
                  <SelectValue placeholder={option.label} />
                </SelectTrigger>

                <SelectContent className='z-[9999]'>
                  {/* Placeholder as clear option */}
                  <SelectItem value={option.label}>{option.label}</SelectItem>
                  {option.options.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {/* Result Count */}
        <span className='my-2 text-gray-500 text-sm'>
          {totalResults || 0} results
        </span>
      </div>
    </div>
  )
}
