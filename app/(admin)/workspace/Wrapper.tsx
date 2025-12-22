'use client'
import { useState } from "react"
import SideBarAdmin from "./components/SideBar"

interface LayoutProps {
    children: React.ReactNode
}

export default function Wrapper({ children }: LayoutProps) {
    const [collapsed, setCollapsed] = useState(false)


    return (
        <div className='flex min-h-screen'>

            <div className={`${collapsed ? 'w-[10%]' : 'w-1/5'} z-[1000]`}>
                <SideBarAdmin collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
            <section className={`flex flex-col bg-white ${collapsed ? 'w-full' : 'w-4/5'}`}>{children}</section>
        </div>
    )
}
