'use client'
import Nav from '@/app/components/pages/auth/SignupNav'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUp () {
  const [step, setStep] = useState<'general' | 'provider'>('general')
  const [isACusomer, setIsACustomer] = useState(false)
  const [isAProvider, setIsAProvider] = useState(false)

  return (
    <div className='relative flex md:flex-row flex-col w-full min-h-screen'>
      {/* Left side */}
      <div className='top-0 sticky flex flex-col justify-between bg-[var(--primary-color)] px-8 py-16 w-full md:w-1/2 min-h-screen'>
        {/* logo */}
        <div className='text-[var(--font-md)]'>
          <span className='font-thin text-[var(--neutral-white)]/70'>
            Crown-11111
          </span>
          <span className='font-extrabold text-[var(--neutral-white)]'>
            Haven
          </span>
        </div>

        {/* auth intro */}
        <div>
          <h2 className='max-w-[90%] font-bold text-[32px] text-white md:text-[50px] leading-tight'>
            Start Something New with Crown-Haven
          </h2>
          <p className='pt-4 max-w-[90%] font-thin text-white/70'>
            Join a community built on trust and opportunity. Whether you’re
            searching for a home or offering your services, Crown-Haven connects
            you with the right people. Enjoy secure transactions, verified
            profiles, and reliable support. Your journey to growth begins here.
          </p>
        </div>

        {/* footnote */}
        <div>
          <span className='text-[12px] text-[var(--neutral-white)]/70'>
            &copy; 2025 Crown-Haven. All rights reserved.
          </span>
        </div>
      </div>

      {/* Right side */}
      <div className='relative flex-1 bg-white px-8 py-16 w-full md:w-1/2 h-screen overflow-y-auto'>
        {/* cta */}
        <div className='top-4 right-8 absolute'>
          <span className='text-[12px] text-[var(--foundation-neutral)]'>
            Already have an account?{' '}
            <Link
              href='/auth/login'
              className='font-bold text-[var(--primary-color)]'
            >
              Sign in
            </Link>
          </span>
        </div>

        {/* step navigation */}
        <Nav step={step} />

        {/* General Step */}
        {step === 'general' && (
          <form className='flex flex-col gap-4 mt-8'>
            {/* First/Last Name */}
            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  First Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Oluwapelumi'
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  Last Name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='Oluwapelumi'
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
                />
              </div>
            </div>

            {/* Email */}
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Email Address <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                placeholder='example@gmail.com'
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
              />
            </div>

            {/* Phone */}
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Phone Number <span className='text-red-500'>*</span>
              </label>
              <input
                type='tel'
                placeholder='+234 91 2148 2621'
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Password <span className='text-red-500'>*</span>
              </label>
              <input
                type='password'
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Confirm Password <span className='text-red-500'>*</span>
              </label>
              <input
                type='password'
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
              />
            </div>

            {/* Role */}
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                I’m a … <span className='text-red-500'>*</span>
              </label>
              <div className='flex gap-6'>
                <label className='flex items-center gap-2 text-[14px] text-[var(--foundation-neutral)]'>
                  <input
                    type='radio'
                    name='role'
                    value='customer'
                    onChange={() => {
                      setIsAProvider(false)
                      setIsACustomer(true)
                    }}
                    className='text-[8px] text-[var(--foundation-neutral)]'
                  />
                  Customer
                </label>
                <label className='flex items-center gap-2 text-[14px] text-[var(--foundation-neutral)]'>
                  <input
                    type='radio'
                    name='role'
                    value='provider'
                    onChange={() => {
                      setIsACustomer(false)
                      setIsAProvider(true)
                    }}
                    className='text-[13px] text-[var(--foundation-neutral)]'
                  />
                  Service Provider
                </label>
              </div>
            </div>
          </form>
        )}

        {/* Customer Step */}
        {step === 'general' && (
          <div className='flex flex-col gap-4 mt-8'>
            <div className='flex justify-between'>
              <button
                type='button'
                onClick={() => setStep('general')}
                className='px-6 py-2 border border-gray-300 rounded-md text-sm'
              >
                Back
              </button>
              {isAProvider ? (
                <button
                  type='button'
                  className='bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-white text-sm'
                  onClick={() => setStep('provider')}
                >
                  {' '}
                  Next{' '}
                </button>
              ) : (
                <button
                  type='submit'
                  className='bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-white text-sm'
                >
                  {' '}
                  Submit{' '}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Provider Step */}
        {step === 'provider' && (
          <form className='flex flex-col gap-4 mt-16'>
            {/* Service Providers Form */}
            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Business Name <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='Business name'
                className='px-3 py-2 border border-gray-300 rounded-md text-sm'
              />
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Business Type / Category <span className='text-red-500'>*</span>
              </label>
              <select className='px-3 py-2 border border-gray-300 rounded-md text-sm'>
                <option>Select Business Type</option>
              </select>
            </div>

            <div className='flex flex-col'>
              <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                Business Address 1 <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='Address line 1'
                className='px-3 py-2 border border-gray-300 rounded-md text-sm'
              />
            </div>

            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  Business Address 2
                </label>
                <input
                  type='text'
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm'
                />
              </div>
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  City <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  className='px-3 py-2 border border-gray-300 rounded-md text-sm'
                />
              </div>
            </div>

            <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  Country <span className='text-red-500'>*</span>
                </label>
                <select className='px-3 py-2 border border-gray-300 rounded-md text-sm'>
                  <option>Nigeria</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  State <span className='text-red-500'>*</span>
                </label>
                <select className='px-3 py-2 border border-gray-300 rounded-md text-sm'>
                  <option>Oyo</option>
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className='flex justify-between mt-6'>
              <button
                type='button'
                onClick={() => {setStep('general')
                  setIsAProvider(false)
                }}
                className='px-6 py-2 border border-gray-300 rounded-md text-sm'
              >
                Previous
              </button>
              <button
                type='submit'
                className='bg-[var(--primary-color)] px-6 py-2 rounded-md font-semibold text-white text-sm'
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
