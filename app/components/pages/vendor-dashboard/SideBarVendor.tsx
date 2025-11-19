'use client'
import { PanelRightClose } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { MdDashboard } from 'react-icons/md'
import { TbMessageCircleStar, TbHandLoveYou } from 'react-icons/tb'
import { BiSolidUniversalAccess } from 'react-icons/bi'
import { usePathname } from 'next/navigation'

export default function SideBarVendor () {
  const pathname = usePathname()
  const vendor = 1023
  const navLinks = [
    { href: '/provider/dashboard', label: 'Dashboard', icon: MdDashboard },
    { href: `/provider/ads`, label: 'My Ads', icon: TbHandLoveYou },
    {
      href: '/provider/post',
      label: 'Post New Ad',
      icon: TbMessageCircleStar
    },
    {
      href: '/provider/analytics',
      label: 'Analytics',
      icon: TbMessageCircleStar
    },
    {
      href: '/provider/messages',
      label: 'Messages',
      icon: TbMessageCircleStar
    }
  ]

  const bottomLinks = [
    { href: '/user/settings', label: 'Settings' },
    { href: '/user/help', label: 'Help & Support' },
    { href: '/auth/logout', label: 'Signout' }
  ]

  return (
    <div className='top-0 sticky flex flex-col bg-[var(--primary-color)] px-4 py-6 h-screen'>
      <div className='flex flex-col h-full'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01]
            }}
          >
            <span className='font-thin text-[var(--neutral-white)]/70'>
              Crown-
            </span>
            <span className='font-extrabold text-[var(--neutral-white)]'>
              Haven
            </span>
          </motion.div>
          <PanelRightClose
            color='white'
            size={20}
            className='opacity-80 hover:opacity-100 transition-all cursor-pointer'
          />
        </div>

        {/* Navigation */}
        <div className='flex flex-col justify-between mt-8 h-full'>
          <nav>
            <ul className='flex flex-col gap-2'>
              {navLinks.map(({ href, label, icon: Icon }) => {
                // Special case for dynamic route: /provider/[vendor]/ads
                const inAdsSection = pathname.includes('/ads')
                const isActive =
                  pathname === href ||
                  (href === `/provider/ads` && inAdsSection)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
                        isActive
                          ? 'bg-[var(--secondary-color)] text-[var(--heading-color)] font-semibold'
                          : 'text-white/70 hover:text-white hover:opacity-100'
                      }`}
                    >
                      <Icon size={20} />
                      <span className='text-[13px] leading-relaxed'>
                        {label}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Bottom Links */}
          <nav>
            <ul className='flex flex-col gap-2'>
              {bottomLinks.map(({ href, label }) => {
                const isActive = pathname === href
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`flex items-center px-3 py-2 rounded-md transition-all ${
                        isActive
                          ? 'bg-[var(--secondary-color)] text-[var(--heading-color)] font-semibold'
                          : 'text-white/70 hover:text-white hover:opacity-100'
                      } text-[13px] leading-relaxed`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
