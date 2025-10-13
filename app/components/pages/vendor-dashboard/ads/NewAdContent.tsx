'use client'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'
import AdDetailForm from './newAdWidgets/AdDetails'
import LocationForm from './newAdWidgets/Location'
import UploadMedia from './newAdWidgets/UploadMedia'
import PropertyInfoForm from './newAdWidgets/PropertyInfo'
import ContactInfo from './newAdWidgets/ContactInfo'

export default function NewAdContent () {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section)
  }
  return (
    <div className='flex flex-col gap-4'>
      {/* field groups */}
      <div>
        <details
          open={openSection === 'ad'}
          className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm transition-all duration-200 cursor-pointer'
        >
          <summary
            className='flex justify-between select-none'
            onClick={e => {
              e.preventDefault()
              toggleSection('ad')
            }}
          >
            <span className='font-semibold text-[var(--heading-color)]'>
              Ad Details
            </span>
            <ChevronDownIcon
              color='black'
              size={15}
              className={`font-bold ${
                openSection === 'ad' ? 'rotate-180' : ''
              } `}
            />
          </summary>
          <AdDetailForm />
        </details>
      </div>
      <div>
        <details
          open={openSection === 'loc'}
          className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm transition-all duration-200 cursor-pointer'
        >
          <summary
            onClick={e => {
              e.preventDefault()
              toggleSection('loc')
            }}
            className='flex justify-between select-none'
          >
            <span className='font-semibold text-[var(--heading-color)]'>
              Location
            </span>
            <ChevronDownIcon
              color='black'
              size={15}
              className={`font-bold ${
                openSection === 'loc' ? 'rotate-180' : ''
              } `}
            />{' '}
          </summary>
          <LocationForm />
        </details>
      </div>
      <div>
        <details
          open={openSection === 'propInfo'}
          className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm transition-all duration-200 cursor-pointer'
        >
          <summary
            onClick={e => {
              e.preventDefault()
              toggleSection('propInfo')
            }}
            className='flex justify-between select-none'
          >
            <span className='font-semibold text-[var(--heading-color)]'>
              Property Info
            </span>
            <ChevronDownIcon
              color='black'
              size={15}
              className={`font-bold ${
                openSection === 'propInfo' ? 'rotate-180' : ''
              } `}
            />{' '}
          </summary>
          <PropertyInfoForm />
        </details>
      </div>
      <div>
        <details
          open={openSection === 'upload'}
          className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm transition-all duration-200 cursor-pointer'
        >
          <summary
            onClick={e => {
              e.preventDefault()
              toggleSection('upload')
            }}
            className='flex justify-between select-none'
          >
            <span className='font-semibold text-[var(--heading-color)]'>
              Upload Media
            </span>
            <ChevronDownIcon
              color='black'
              size={15}
              className={`font-bold ${
                openSection === 'upload' ? 'rotate-180' : ''
              } `}
            />{' '}
          </summary>
          <UploadMedia />
        </details>
      </div>
      <div>
        <details
          open={openSection === 'contact'}
          className='bg-[var(--foundation-neutral-3)] px-6 py-8 rounded-sm transition-all duration-200 cursor-pointer'
        >
          <summary
            onClick={e => {
              e.preventDefault()
              toggleSection('contact')
            }}
            className='flex justify-between select-none'
          >
            <span className='font-semibold text-[var(--heading-color)]'>
              Contact Info
            </span>
            <ChevronDownIcon
              color='black'
              size={15}
              className={`font-bold ${
                openSection === 'contact' ? 'rotate-180' : ''
              } `}
            />{' '}
          </summary>
          <ContactInfo />
        </details>
      </div>
    </div>
  )
}
