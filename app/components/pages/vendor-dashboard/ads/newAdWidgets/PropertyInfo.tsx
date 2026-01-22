'use client'
import React from 'react'

interface PropertyInfoFormProps {
  data: {
    listing_type: string
    size: string
    bedrooms: string
    bathrooms: string
    price: string
  }
  onChange: (field: string, value: string) => void
}

export default function PropertyInfoForm({ data, onChange }: PropertyInfoFormProps) {
  return (
    <div className='flex flex-col gap-4 mt-4'>
      {/* Listing Type and Size */}
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 w-full'>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='listing_type'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Listing
          </label>
          <select
            id='listing_type'
            name='listing_type'
            value={data.listing_type}
            onChange={e => onChange('listing_type', e.target.value)}
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          >
            <option value=''>Select Listing Type</option>
            <option value='sale'>For Sale</option>
            <option value='rent'>For Rent</option>
          </select>
        </div>

        <div className='flex flex-col gap-1'>
          <label
            htmlFor='size'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Size (sq ft)
          </label>
          <input
            id='size'
            type='number'
            name='size'
            min={0}
            value={data.size}
            onWheel={e => e.currentTarget.blur()}
            onChange={e => onChange('size', e.target.value)}
            placeholder='e.g. 500'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>
      </div>

      {/* Bedrooms and Bathrooms */}
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 w-full'>
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='bedrooms'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Bedrooms
          </label>
          <input
            id='bedrooms'
            type='number'
            min={0}
            name='bedrooms'
            value={data.bedrooms}
            onWheel={e => e.currentTarget.blur()}
            onChange={e => onChange('bedrooms', e.target.value)}
            placeholder='e.g. 4'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label
            htmlFor='bathrooms'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Bathrooms
          </label>
          <input
            id='bathrooms'
            name='bathrooms'
            type='number'
            min={0}
            value={data.bathrooms}
            onWheel={e => e.currentTarget.blur()}
            onChange={e => onChange('bathrooms', e.target.value)}
            placeholder='e.g. 2'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>
      </div>

      {/* Price */}
      <div className='flex flex-col gap-1 w-full'>
        <label
          htmlFor='price'
          className='font-semibold text-[14px] text-[var(--heading-color)]'
        >
          Pricing (₦)
        </label>
        <input
          id='price'
          type='number'
          name='price'
          min={0}
          value={data.price}
          onWheel={e => e.currentTarget.blur()}
          onChange={e => onChange('price', e.target.value)}
          placeholder='e.g. 50000000'
          className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm font-semibold text-[12px]'
        />
      </div>
    </div>
  )
}
