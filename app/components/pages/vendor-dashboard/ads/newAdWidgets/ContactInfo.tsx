'use client'
import React from 'react'
import PhoneInput, { CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface Props {
  data: {
    email: string
    phone_country_iso: string
    phone_e164: string
  }
  onChange: (field: string, value: any) => void
}

export default function ContactInfo ({ data, onChange }: Props) {
  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className='flex flex-col gap-4'>
        {/* Email */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='email'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            id='email'
            type='email'
            name='email'
            value={data.email}
            onChange={e => onChange('email', e.target.value)}
            placeholder='example@gmail.com'
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full font-semibold text-[12px]'
          />
        </div>

        {/* Phone */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='phone'
            className='font-semibold text-[14px] text-[var(--heading-color)]'
          >
            Phone Number <span className='text-red-500'>*</span>
          </label>
          <PhoneInput
            country={'ng'} // Default to Nigeria
            value={data.phone_e164.replace('+', '')} // remove '+' for controlled input
            onChange={(val: string, country: CountryData) => {
              const e164 = `+${val}`
              onChange('phone_e164', e164)
              onChange('phone_country_iso', country?.countryCode?.toUpperCase())
            }}
            enableSearch={true}
            inputStyle={{
              width: '100%',
              height: '40px',
              fontSize: '14px'
            }}
            buttonStyle={{
              border: 'none',
              background: '#fff'
            }}
            dropdownStyle={{
              maxHeight: '200px'
            }}
          />
        </div>
      </div>
    </div>
  )
}
