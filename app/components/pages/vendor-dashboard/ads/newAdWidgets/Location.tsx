'use client'
import React from 'react'

interface LocationFormProps {
  data: {
    street: string
    area: string
    lga: string
    state: string
    country: string
  }
  onChange: (field: string, value: string) => void
}

export default function LocationForm({ data, onChange }: LocationFormProps) {
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 w-full'>
        {/* Street */}
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='street'
          >
            Street
          </label>
          <input
            id='street'
            name='street'
            required
            type='text'
            value={data.street}
            onChange={e => onChange('street', e.target.value)}
            placeholder='Carlton Street'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>

        {/* Area */}
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='area'
          >
            Area
          </label>
          <input
            id='area'
            type='text'
            name='area'
            required
            value={data.area}
            onChange={e => onChange('area', e.target.value)}
            placeholder='Molete'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>
      </div>

      <div className='gap-2 grid grid-cols-1 md:grid-cols-2 w-full'>
        {/* LGA */}
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='lga'
          >
            LGA
          </label>
          <input
            id='lga'
            name='lga'
            type='text'
            required
            value={data.lga}
            onChange={e => onChange('lga', e.target.value)}
            placeholder='Ibadan North'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>

        {/* State */}
        <div className='flex flex-col gap-1'>
          <label
            className='font-semibold text-[14px] text-[var(--heading-color)]'
            htmlFor='state'
          >
            State
          </label>
          <input
            id='state'
            name='state'
            type='text'
            required
            value={data.state}
            onChange={e => onChange('state', e.target.value)}
            placeholder='Oyo State'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>
      </div>

      {/* Country */}
      <div className='flex flex-col gap-1 w-full'>
        <label
          className='font-semibold text-[14px] text-[var(--heading-color)]'
          htmlFor='country'
        >
          Country
        </label>
        <input
          id='country'
          type='text'
          name='country'
          required
          value={data.country}
          onChange={e => onChange('country', e.target.value)}
          placeholder='Nigeria'
          className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm font-semibold text-[12px]'
        />
      </div>
    </div>
  )
}
