'use client'
import { useEffect, useRef, useState } from 'react'
interface StepFormTwoProps {
  onValidityChange: (valid: boolean) => void
}
export default function StepFormThree ({ onValidityChange }: StepFormTwoProps) {
  const [formData, setFormData] = useState({
    accountName: '',
    accountNo: '',
    bankName: ''
  })
  const prevValid = useRef<boolean | null>(null)

  const allValid = Boolean(
    formData.accountName && formData.accountNo && formData.bankName
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
      <h2 className='mb-4 font-bold text-lg'>Bank Information</h2>

      <div className='flex flex-col'>
        <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
          Business Bank Account Name <span className='text-red-500'>*</span>
        </label>
        <input
          name='accountName'
          placeholder='Amos'
          value={formData.accountName}
          onChange={handleChange}
          className='bg-white p-2 border rounded'
        />
      </div>

      <div className='flex flex-col mt-2'>
        <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
          Account Number <span className='text-red-500'>*</span>
        </label>{' '}
        <input
          name='accountNo'
          placeholder='2389087890'
          value={formData.accountNo}
          onChange={handleChange}
          className='bg-white p-2 border rounded w-full'
        />
      </div>
      <div className='flex flex-col mt-2'>
        <label className='mb-1 font-semibold text-[var(--foundation-neutral)] text-sm'>
          Bank Name <span className='text-red-500'>*</span>
        </label>{' '}
        <input
          name='bankName'
          placeholder='Guaranty Trust Bank'
          value={formData.bankName}
          onChange={handleChange}
          className='bg-white p-2 border rounded w-full'
        />
      </div>
    </div>
  )
}
