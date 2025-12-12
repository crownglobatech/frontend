'use client'
import { PanelRightClose } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { MdDashboard } from 'react-icons/md'
import { TbMessageCircleStar, TbHandLoveYou } from 'react-icons/tb'
import { LogOut } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function SideBarAdmin() {
    const pathname = usePathname()
    const navLinks = [
        { href: '/workspace/dashboard', label: 'Dashboard', icon: MdDashboard },
        { href: `/workspace/users`, label: 'Users', icon: TbHandLoveYou },
        {
            href: '/workspace/vendors',
            label: 'Vendors',
            icon: TbMessageCircleStar
        },
        {
            href: '/workspace/bookings',
            label: 'Bookings',
            icon: TbMessageCircleStar
        },
        {
            href: '/workspace/reports',
            label: 'Reports',
            icon: TbMessageCircleStar
        }
    ]

    const bottomLinks = [
        { href: '/auth/login', label: 'login', icon: LogOut }
    ]

    return (
        <div className='top-0 sticky flex flex-col bg-white px-4 py-6 h-screen'>
            <div className='flex flex-col h-full'>
                {/* Header */}
                <div className='flex justify-between items-center mt-2'>
                    <motion.div
                        initial={{ y: -50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.5,
                            ease: [0, 0.71, 0.2, 1.01]
                        }}
                    >
                        <span className='font-thin text-[var(--text-body)]/70'>
                            Crown-
                        </span>
                        <span className='font-extrabold text-[var(--text-body)]'>
                            Haven
                        </span>
                    </motion.div>
                    <PanelRightClose
                        color='black'
                        size={20}
                        className='opacity-60 hover:opacity-100 transition-all cursor-pointer'
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
                                            className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${isActive
                                                ? 'bg-[var(--primary-color)] text-white font-semibold'
                                                : 'text-[var(--text-body)] hover:text-[var(--text-body)]/70 hover:opacity-100'
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
                            {bottomLinks.map(({ href, label, icon: Icon }) => {
                                const isActive = pathname === href
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={`flex gap-2 items-center px-3 py-2 rounded-md transition-all capitalize ${isActive
                                                ? 'bg-[var(--primary-color)] text-white font-semibold'
                                                : 'text-[var(--text-body)] hover:text-[var(--text-body)]/70'
                                                } text-[13px] leading-relaxed`}
                                        >
                                            <Icon size={20}/>
                                            <span>{label}</span>
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
