'use client'
import LoadingDots from '@/app/components/general/LoadingDots'
import { useNotification } from '@/app/contexts/NotificationProvider'
import { Ad } from '@/lib/types'
import { FormEvent, useState } from 'react'
import PhoneInput, { CountryData } from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { logger } from "@/lib/logger"

interface Props {
  adData: Ad
}

export default function EditContactInfo({ adData }: Props) {
  const [loading, setLoading] = useState(false)
  const [fullPhone, setFullPhone] = useState(adData?.phone_e164 || '')
  const [countryIso, setCountryIso] = useState(adData?.phone_country_iso || 'NG')
  const [email, setEmail] = useState(adData?.email || '')
  const { notify } = useNotification()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        notify('User not authenticated.', 'error')
        setLoading(false)
        return
      }

      const form = new FormData()
      form.append('email', email)
      form.append('phone_e164', fullPhone.startsWith('+') ? fullPhone : `+${fullPhone}`)
      form.append('phone_country_iso', countryIso)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${adData.id}/update`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      )

      const data = await res.json()
      if (res.ok) {
        notify(data.status || 'Contact information updated successfully!', 'success', 'Changes Saved')
      } else {
        notify(data?.message || 'Failed to update contact info.', 'error')
      }
    } catch (error) {
      logger.error(error)
      notify('An unexpected error occurred.', 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col gap-2'>
      <h2 className='font-bold text-[16px] text-[var(--heading-color)]'>
        Edit Contact Info
      </h2>
      <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className='flex flex-col gap-1'>
          <label
            htmlFor='email'
            className='font-semibold text-[var(--heading-color)]'
          >
            Email <span className='text-red-500'>*</span>
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-white px-4 py-2 border border-[var(--foundation-neutral-6)] rounded-sm w-full'
            type='email'
            placeholder='example@gmail.com'
            required
          />
        </div>

        {/* Phone Field */}
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='phone'
            className='font-semibold text-[var(--heading-color)]'
          >
            Phone Number <span className='text-red-500'>*</span>
          </label>
          <PhoneInput
            country={countryIso.toLowerCase() || 'ng'}
            value={fullPhone}
            onChange={(val, country: CountryData) => {
              const formatted = val.startsWith('+') ? val : `+${val}`
              setFullPhone(formatted)
              setCountryIso(country?.countryCode?.toUpperCase() || 'NG')
            }}
            enableSearch={true}
            inputStyle={{
              width: '100%',
              height: '40px',
              fontSize: '14px',
              background: 'white',
              borderRadius: '6px',
            }}
            buttonStyle={{
              border: '1px',
              borderColor: 'var(--foundation-neutral-6)',
              background: '#fff',
            }}
            dropdownStyle={{
              maxHeight: '200px',
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          className='bg-[var(--primary-color)] px-4 py-1.5 rounded-md min-h-[40px] font-semibold text-white cursor-pointer'
          type='submit'
          disabled={loading}
        >
          {loading ? <LoadingDots /> : 'Submit'}
        </button>
      </form>
    </div>
  )
}
