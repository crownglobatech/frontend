'use client'
import React, { useState, useEffect, useRef } from 'react'

interface StepFormOneProps {
  onValidityChange: (valid: boolean) => void
}

export default function StepFormOne ({ onValidityChange }: StepFormOneProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    dob: '',
    idFile: null as File | null
  })

  const prevValid = useRef<boolean | null>(null)

  const allValid = Boolean(
    formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.dob &&
      formData.idFile
  )

  useEffect(() => {
    // Only trigger onValidityChange if the value changed
    if (prevValid.current !== allValid) {
      onValidityChange(allValid)
      prevValid.current = allValid
    }
  }, [allValid, onValidityChange])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }))
  }

  return (
    <div className='bg-[var(--foundation-neutral-4)] shadow-md mx-auto p-6 rounded-md w-[70%]'>
      <h2 className='mb-4 font-bold text-lg'>Personal Information (KYB)</h2>

      <div className='gap-4 grid grid-cols-2'>
        <div className='flex flex-col'>
          <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
            First Name <span className='text-red-500'>*</span>
          </label>
          <input
            name='firstName'
            placeholder='Amos'
            value={formData.firstName}
            onChange={handleChange}
            className='bg-white p-2 border rounded'
          />
        </div>
        <div className='flex flex-col'>
          <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
            Last Name <span className='text-red-500'>*</span>
          </label>
          <input
            name='lastName'
            placeholder='Oluwapelumi'
            value={formData.lastName}
            onChange={handleChange}
            className='bg-white p-2 border rounded'
          />
        </div>
      </div>

      <div className='flex flex-col mt-2'>
        <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
          Home Address <span className='text-red-500'>*</span>
        </label>{' '}
        <input
          name='address'
          placeholder='University of Jos, Jos, Plateau'
          value={formData.address}
          onChange={handleChange}
          className='bg-white p-2 border rounded w-full'
        />
      </div>

      <div className='flex flex-col mt-2'>
        <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
          Date of Birth<span className='text-red-500'>*</span>
        </label>
        <input
          name='dob'
          type='date'
          value={formData.dob}
          onChange={handleChange}
          className='bg-white p-2 border rounded w-full'
        />
      </div>
      <div className='mt-4'>
        <label
          htmlFor='Id documents'
          className='font-semibold text-[var(--foundation-neutral)] text-sm'
        >
          {' '}
          Valid ID (NIN, Driver’s License, or Passport){' '}
          <span className='text-red-500'>*</span>
        </label>
        <label
          htmlFor='idFile'
          className='flex flex-col justify-center items-center mt-1 p-8 border-2 border-gray-300 hover:border-gray-400 border-dashed rounded-lg w-full text-center transition cursor-pointer'
        >
          {formData.idFile ? (
            <div className='flex flex-col items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mb-2 w-8 h-8 text-green-500'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5 13l4 4L19 7'
                />
              </svg>
              <p className='text-gray-700 text-sm'>
                <span className='font-medium text-gray-900'>
                  {formData.idFile.name}
                </span>
              </p>
              <p className='text-gray-500 text-xs'>Click to change file</p>
            </div>
          ) : (
            <div className='flex flex-col items-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='mb-2 w-8 h-8 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0l-4 4m4-4l4 4'
                />
              </svg>
              <p className='text-gray-700 text-sm'>
                <span className='font-medium text-gray-900'>Upload a file</span>{' '}
                or drag and drop
              </p>
              <p className='text-gray-500 text-xs'>PNG, JPG, PDF up to 10MB</p>
            </div>
          )}
        </label>

        <input
          id='idFile'
          name='idFile'
          type='file'
          accept='.png,.jpg,.jpeg,.pdf'
          onChange={handleChange}
          className='hidden'
        />
      </div>
    </div>
  )
}
