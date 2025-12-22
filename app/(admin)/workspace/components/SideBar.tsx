'use client'

import { PanelRightClose, PanelLeftClose } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import { MdDashboard, MdAnalytics, MdPeople } from 'react-icons/md'
import { LogOut, BookAIcon, Users } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState, useEffect, SetStateAction, Dispatch } from 'react'

interface Props {
    collapsed: boolean
    setCollapsed: Dispatch<SetStateAction<boolean>>;
}
export default function SideBarAdmin({ collapsed, setCollapsed }: Props) {
    const pathname = usePathname()
    const [isMobile, setIsMobile] = useState(false)

    // Detect screen size
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768
            setIsMobile(mobile)
            setCollapsed(mobile) // Auto-collapse on mobile
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const navLinks = [
        { href: '/workspace/dashboard', label: 'Dashboard', icon: MdDashboard },
        { href: '/workspace/users', label: 'Users', icon: Users },
        { href: '/workspace/vendors', label: 'Vendors', icon: MdPeople },
        { href: '/workspace/bookings', label: 'Bookings', icon: BookAIcon },
        { href: '/workspace/analytics', label: 'Analytics', icon: MdAnalytics }
    ]

    const bottomLinks = [
        { href: '/auth/login', label: 'Login', icon: LogOut }
    ]

    return (
        <motion.aside
            initial={false}
            animate={{
                width: collapsed ? '120px' : '256px'
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed flex h-screen flex-col border-r bg-white z-[1000]"
        >
            {/* Header */}
            <div className={`flex h-16 items-center ${collapsed ? 'justify-center' : 'justify-between'} mt-4 px-4`}>
                <AnimatePresence mode="wait">
                    {!collapsed && (
                        <motion.h1
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="text-[18px] font-bold transition-all "
                        >
                            Crown-Haven
                        </motion.h1>
                    )}
                </AnimatePresence>

                <motion.button
                    onClick={() => setCollapsed(prev => !prev)}
                    className="rounded-lg p-2 opacity-70 flex items-center flex-col transition-all hover:bg-gray-100 hover:opacity-100"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {collapsed ? (
                        <PanelLeftClose className="h-5 w-5 " />
                    ) : (
                        <PanelRightClose className="h-5 w-5" />
                    )}
                </motion.button>
            </div>

            {/* NAV AREA */}
            <nav className="flex flex-1 flex-col justify-between overflow-y-auto p-4">
                {/* Main Nav */}
                <ul className="space-y-2">
                    {navLinks.map(({ href, label, icon: Icon }) => {
                        const active = pathname === href
                        return (
                            <li key={href}>
                                <Link
                                    href={href}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${active
                                            ? 'bg-[var(--primary-color)] text-white font-medium'
                                            : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    <Icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />

                                    <AnimatePresence mode="wait">
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="whitespace-nowrap overflow-hidden"
                                            >
                                                {label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                {/* Bottom Nav */}
                <ul className="space-y-2 border-t pt-4">
                    {bottomLinks.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                            <Link
                                href={href}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 transition-all hover:bg-gray-100"
                            >
                                <Icon className={`h-5 w-5 flex-shrink-0 ${collapsed ? 'mx-auto' : ''}`} />

                                <AnimatePresence mode="wait">
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{ opacity: 1, width: 'auto' }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="whitespace-nowrap overflow-hidden"
                                        >
                                            {label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.aside>
    )
}