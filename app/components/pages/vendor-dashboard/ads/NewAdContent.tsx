'use client'

import React, { useState, useRef } from 'react'
import { ChevronDownIcon } from 'lucide-react'
import AdDetailForm from './newAdWidgets/AdDetails'
import LocationForm from './newAdWidgets/Location'
import PropertyInfoForm from './newAdWidgets/PropertyInfo'
import UploadMedia from './newAdWidgets/UploadMedia'
import ContactInfo from './newAdWidgets/ContactInfo'
import LoadingDots from '@/app/components/general/LoadingDots'
import { postNewAd } from '@/lib/api'
import { useNotification } from '@/app/contexts/NotificationProvider'

export default function NewAdContent () {
  const { notify } = useNotification()
  const [loading, setLoading] = useState(false)
  const [openSection, setOpenSection] = useState<string | null>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const toggleSection = (section: string) => {
    setOpenSection(prev => (prev === section ? null : section))
  }

  const initialFormData = {
    title: '',
    description: '',
    street: '',
    area: '',
    lga: '',
    state: '',
    country: '',
    listing_type: '',
    size: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    photos: [] as File[],
    email: '',
    phone_e164: '',
    phone_country_iso: ''
  }

  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // ---------------- FORM VALIDATION ----------------
  const validateForm = (data: typeof formData) => {
    const errors: { field: string; message: string }[] = []

    const requiredFields: [keyof typeof data, string][] = [
      ['title', 'Title is required'],
      ['description', 'Description is required'],
      ['street', 'Street is required'],
      ['area', 'Area is required'],
      ['lga', 'LGA is required'],
      ['state', 'State is required'],
      ['country', 'Country is required'],
      ['listing_type', 'Listing type is required'],
      ['size', 'Size is required'],
      ['bedrooms', 'Number of bedrooms is required'],
      ['bathrooms', 'Number of bathrooms is required'],
      ['price', 'Price is required'],
      ['email', 'Email is required']
    ]

    requiredFields.forEach(([field, message]) => {
      if (!data[field] || !String(data[field]).trim()) {
        errors.push({ field, message })
      }
    })

    if (data.photos.length === 0) {
      errors.push({
        field: 'photos',
        message: 'At least one photo is required'
      })
    }

    if (!data.phone_e164.trim() || !data.phone_country_iso.trim()) {
      errors.push({ field: 'phone', message: 'Phone number is required' })
    }

    return errors
  }

  // ---------------- HANDLE SUBMIT ----------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const errors = validateForm(formData)

    if (errors.length > 0) {
      // Show all validation messages
      errors.forEach(err => notify(err.message, 'error'))

      // Find the first invalid field
      const firstErrorField = formRef.current?.querySelector(
        `[name="${errors[0].field}"]`
      ) as HTMLElement | null

      if (firstErrorField) {
        // Open the <details> section that contains the invalid field
        const detailsParent = firstErrorField.closest('details')
        if (detailsParent) {
          const summaryText = detailsParent
            .querySelector('summary')
            ?.textContent?.toLowerCase()

          if (summaryText?.includes('ad')) setOpenSection('ad')
          else if (summaryText?.includes('location')) setOpenSection('loc')
          else if (summaryText?.includes('property')) setOpenSection('propInfo')
          else if (summaryText?.includes('upload')) setOpenSection('upload')
          else if (summaryText?.includes('contact')) setOpenSection('contact')
        }

        // Scroll smoothly to the field
        setTimeout(() => {
          firstErrorField.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          })
        }, 150)
      }

      setLoading(false)
      return
    }

    try {
      const result = await postNewAd(formData)
      notify(result.message || 'Ad published successfully!', 'success', 'Ad Published')
      setFormData(initialFormData)
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : 'Something went wrong while posting your ad.'
      notify(message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // ---------------- JSX ----------------
  return (
    <form ref={formRef} onSubmit={handleSubmit} className='flex flex-col gap-4' noValidate>
      {/* Ad Details */}
      <details
        open={openSection === 'ad'}
        className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm'
      >
        <summary
          onClick={e => {
            e.preventDefault()
            toggleSection('ad')
          }}
          className='flex justify-between items-center cursor-pointer select-none'
        >
          <span className='font-semibold text-[var(--heading-color)]'>
            Ad Details
          </span>
          <ChevronDownIcon
            size={15}
            className={`transition-transform ${
              openSection === 'ad' ? 'rotate-180' : ''
            }`}
          />
        </summary>
        <AdDetailForm data={formData} onChange={handleChange} />
      </details>

      {/* Location */}
      <details
        open={openSection === 'loc'}
        className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm'
      >
        <summary
          onClick={e => {
            e.preventDefault()
            toggleSection('loc')
          }}
          className='flex justify-between items-center cursor-pointer select-none'
        >
          <span className='font-semibold text-[var(--heading-color)]'>
            Location
          </span>
          <ChevronDownIcon
            size={15}
            className={`transition-transform ${
              openSection === 'loc' ? 'rotate-180' : ''
            }`}
          />
        </summary>
        <LocationForm data={formData} onChange={handleChange} />
      </details>

      {/* Property Info */}
      <details
        open={openSection === 'propInfo'}
        className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm'
      >
        <summary
          onClick={e => {
            e.preventDefault()
            toggleSection('propInfo')
          }}
          className='flex justify-between items-center cursor-pointer select-none'
        >
          <span className='font-semibold text-[var(--heading-color)]'>
            Property Info
          </span>
          <ChevronDownIcon
            size={15}
            className={`transition-transform ${
              openSection === 'propInfo' ? 'rotate-180' : ''
            }`}
          />
        </summary>
        <PropertyInfoForm data={formData} onChange={handleChange} />
      </details>

      {/* Upload Media */}
      <details
        open={openSection === 'upload'}
        className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm'
      >
        <summary
          onClick={e => {
            e.preventDefault()
            toggleSection('upload')
          }}
          className='flex justify-between items-center cursor-pointer select-none'
        >
          <span className='font-semibold text-[var(--heading-color)]'>
            Upload Media
          </span>
          <ChevronDownIcon
            size={15}
            className={`transition-transform ${
              openSection === 'upload' ? 'rotate-180' : ''
            }`}
          />
        </summary>
        <UploadMedia
          files={formData.photos}
          onChange={files => handleChange('photos', files)}
        />
      </details>

      {/* Contact Info */}
      <details
        open={openSection === 'contact'}
        className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm'
      >
        <summary
          onClick={e => {
            e.preventDefault()
            toggleSection('contact')
          }}
          className='flex justify-between items-center cursor-pointer select-none'
        >
          <span className='font-semibold text-[var(--heading-color)]'>
            Contact Info
          </span>
          <ChevronDownIcon
            size={15}
            className={`transition-transform ${
              openSection === 'contact' ? 'rotate-180' : ''
            }`}
          />
        </summary>
        <ContactInfo data={formData} onChange={handleChange} />
      </details>

      {/* Buttons */}
      <div className='flex gap-2'>
        <button
          type='button'
          className='bg-transparent px-12 py-1 border border-[var(--primary-color)] w-full font-semibold text-[var(--primary-color)]'
        >
          Preview Ad
        </button>
        <button
          type='submit'
          disabled={loading}
          className='bg-[var(--primary-color)] disabled:opacity-70 px-12 py-1 w-full font-semibold text-white cursor-pointer'
        >
          {loading ? <LoadingDots /> : 'Publish Ad'}
        </button>
      </div>
    </form>
  )
}
