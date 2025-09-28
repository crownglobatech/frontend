'use client'

import Link from 'next/link'
import Button from './Button'
import { usePathname } from 'next/navigation'

export default function Header () {
  const pathName = usePathname()

  const isActive = (href: string) => pathName === href

  return (
    <header className='flex justify-between items-center bg-[var(--neutral-white)] p-4 rounded-md w-full'>
      {/* logo */}
      <div className='text-[var(--font-md)]'>
        <span className='font-normal text-[var(--neutral-black)]'>Crown-</span>
        <span className='font-extrabold text-[var(--neutral-black)]'>
          Haven
        </span>
      </div>

      {/* navigations */}
      <nav className='flex space-x-6'>
        <Link
          href='/'
          className={
            isActive('/')
              ? 'text-[var(--secondary-color)] font-semibold'
              : 'text-[var(--neutral-black)]'
          }
        >
          Home
        </Link>
        <Link
          href='/about'
          className={
            isActive('/about')
              ? 'text-[var(--secondary-color)] font-semibold'
              : 'text-[var(--neutral-black)]'
          }
        >
          About
        </Link>
        <Link
          href='/buy'
          className={
            isActive('/buy')
              ? 'text-[var(--secondary-color)] font-semibold'
              : 'text-[var(--neutral-black)]'
          }
        >
          Buy
        </Link>
        <Link
          href='/rent'
          className={
            isActive('/rent')
              ? 'text-[var(--secondary-color)] font-semibold'
              : 'text-[var(--neutral-black)]'
          }
        >
          Rent
        </Link>
        <Link
          href='/services'
          className={
            isActive('/services')
              ? 'text-[var(--secondary-color)] font-semibold'
              : 'text-[var(--neutral-black)]'
          }
        >
          Services
        </Link>
        <Link
          href='/contact'
          className={
            isActive('/contact')
              ? 'text-[var(--secondary-color)] font-semibold'
              : 'text-[var(--neutral-black)]'
          }
        >
          Contact
        </Link>
      </nav>

      {/* CTAs */}
      <div className='flex space-x-4'>
        <Button styles='bg-transparent font-semibold px-4 py-2' title='Login' />
        <Button styles='bg-[var(--primary-color)] text-white font-semibold rounded-md border px-4 py-2' title='Sign Up' />
      </div>
    </header>
  )
}
