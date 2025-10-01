'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function SignUp () {
  return (
    <div className='relative flex md:flex-row flex-col w-full min-h-screen'>
      {/* Left side */}
      <div className='top-0 sticky flex flex-col justify-between bg-[var(--primary-color)] px-8 py-16 w-full md:w-1/2 min-h-screen'>
        {/* logo */}
        <div className='text-[var(--font-md)]'>
          <span className='font-thin text-[var(--neutral-white)]/70'>
            Crown-
          </span>
          <span className='font-extrabold text-[var(--neutral-white)]'>
            Haven
          </span>
        </div>

        {/* auth intro */}
        <div>
          <h2 className='max-w-[90%] font-bold text-[32px] text-white md:text-[50px] leading-tight'>
            Welcome Back to Crown-Haven{' '}
          </h2>
          <p className='pt-4 max-w-[90%] font-thin text-white/70'>
            Your trusted space for living, renting, or offering services. Log in
            to stay connected and keep moving forward.
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
      <div className='relative flex flex-1 justify-center items-center bg-white px-8 py-16 w-full md:w-1/2 h-screen overflow-y-auto'>
        {/* cta */}
        <div className='relative py-8 w-full'>
          <div className='top-0 right-8 absolute'>
            <span className='text-[12px] text-[var(--foundation-neutral)]'>
              Don't have an account?{' '}
              <Link
                href='/auth/register'
                className='font-bold text-[var(--primary-color)]'
              >
                Sign up
              </Link>
            </span>
          </div>

          <div>
            <div>
              <h2 className='font-bold text-[30px] text-[var(--heading-color)]'>
                Login
              </h2>
              <p className='text-[14px] text-[var(--foundation-neutral)]'>
                Welcome back! Please login to your account.
              </p>
            </div>
            <form className='flex flex-col items-center gap-[20px] mt-12'>
              {/* Email */}
              <div className='flex flex-col w-full'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  Email Address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  placeholder='example@gmail.com'
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
                />
              </div>
              {/* Password */}
              <div className='flex flex-col w-full'>
                <label className='mb-1 font-semibold text-[var(--heading-color)] text-sm'>
                  Password <span className='text-red-500'>*</span>
                </label>
                <input
                  type='password'
                  className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[var(--primary-color)] focus:ring-2 text-sm'
                />
                <Link
                  href='/auth/forgot-password'
                  className='self-end pt-4 font-semibold text-[12px] text-[var(--secondary-color)]'
                >
                  Forgot Password?
                </Link>
              </div>

              <div className='flex justify-center items-center mt-8'>
                <button
                  type='submit'
                  className='bg-[var(--primary-color)] px-12 py-3 rounded-md font-semibold text-white text-sm'
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
