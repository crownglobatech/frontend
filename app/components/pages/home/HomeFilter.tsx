"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../general/Button'

export default function HomeFilter() {
  const router = useRouter()
  const [listingType, setListingType] = useState('sale') // 'sale' (Buy) or 'rent' (Rent)
  const [propertyType, setPropertyType] = useState('')
  const [location, setLocation] = useState('')
  const [beds, setBeds] = useState('')
  const [budget, setBudget] = useState('')

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (listingType) params.append('listing_type', listingType)
    if (propertyType) params.append('property_type', propertyType)
    if (location) params.append('location', location)
    if (budget) {
      params.append('price_min', '0')
      params.append('price_max', budget)
    }
    params.append('category', 'all')
    router.push(`/dashboard?${params.toString()}`)
  }

  return (
    <div className='w-full'>
      <div className='flex justify-center gap-1'>
        <Button
          styles={`${listingType === 'sale' ? 'bg-[var(--secondary-color)] text-white' : 'bg-white text-[var(--heading-color)]'} w-[60px] text-sm font-semibold rounded-t-[4px] uppercase p-1 transition-colors`}
          title='buy'
          event={() => setListingType('sale')}
        />
        <Button
          styles={`${listingType === 'rent' ? 'bg-[var(--secondary-color)] text-white' : 'bg-white text-[var(--heading-color)]'} text-sm font-semibold rounded-t-[4px] w-[60px] uppercase p-1 transition-colors`}
          title='rent'
          event={() => setListingType('rent')}
        />
      </div>
      <div className='flex justify-center bg-white shadow-lg p-6 rounded-md'>
        <div className='flex flex-wrap md:flex-nowrap items-end gap-6 w-full max-w-6xl'>
          {/* Looking For */}
          <div className='flex flex-col flex-1 min-w-[180px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='looking'
            >
              Looking For
            </label>
            <div className='relative w-full'>
              <select
                name='looking'
                id='looking'
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className='bg-white px-4 pr-10 border border-gray-300 focus:border-[var(--primary-color)] rounded-lg focus:outline-none w-full h-11 text-gray-700 appearance-none'
              >
                <option value=''>Any Type</option>
                <option value='apartment'>Apartment</option>
                <option value='house'>House</option>
                <option value='land'>Land</option>
              </select>

              {/* Custom caret */}
              <svg
                className='top-1/2 right-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>

          {/* Location */}
          <div className='flex flex-col flex-1 min-w-[180px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='location'
            >
              Location
            </label>
            <div className='relative w-full'>
              <select
                name='location'
                id='location'
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className='bg-white px-4 pr-10 border border-gray-300 focus:border-[var(--primary-color)] rounded-lg focus:outline-none w-full h-11 text-gray-700 appearance-none'
              >
                <option value=''>Any Location</option>
                <option value='lekki'>Lekki</option>
                <option value='ikeja'>Ikeja</option>
                <option value='ajah'>Ajah</option>
                <option value='yaba'>Yaba</option>
              </select>

              {/* Custom caret */}
              <svg
                className='top-1/2 right-3 absolute w-4 h-4 text-gray-400 -translate-y-1/2 pointer-events-none'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>

          {/* Property Size - Optional for now or maps to nothing effectively */}
          <div className='flex flex-col flex-1 min-w-[150px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='size'
            >
              Bedrooms
            </label>
            <input
              className='shadow-sm px-4 border border-gray-300 focus:border-[var(--primary-color)] rounded-md focus:outline-none h-11 text-gray-700'
              type='number'
              placeholder='Any'
              min={0}
              value={beds}
              onChange={(e) => setBeds(e.target.value)}
            />
          </div>

          {/* Budget */}
          <div className='flex flex-col flex-1 min-w-[150px]'>
            <label
              className='mb-1 font-semibold text-[var(--heading-color)] text-sm uppercase'
              htmlFor='budget'
            >
              Max Price
            </label>
            <input
              className='shadow-sm px-4 border border-gray-300 focus:border-[var(--primary-color)] rounded-md focus:outline-none h-11 text-gray-700'
              type='number'
              placeholder='Any Price'
              min={0}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          {/* Search Button */}
          <div>
            <Button
              styles='bg-[var(--primary-color)] text-white px-6 py-2 rounded-md font-semibold capitalize h-11 w-full md:w-auto'
              title='Search'
              event={handleSearch}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
