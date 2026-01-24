'use client'
import Rating from "@/app/components/general/Rating"
import ProfileDropdown from "@/app/components/general/ProfileDropDown";
import { Menu } from "lucide-react";
import { useSidebar } from "../context/SidebarContext";

interface Props {
    pageTitle: string
}
export default function Header({ pageTitle }: Props) {
    const { toggleSidebar } = useSidebar();
    return (
        <section className='flex flex-col bg-white w-full border-l border-[#F5F5F5]'>
            <div className='bg-white shadow-sm px-6 py-4 w-full'>
                {/* Top bar */}
                <div className='flex justify-between items-center'>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
                        >
                            <Menu className="h-6 w-6 text-gray-600" />
                        </button>
                        <h2 className='font-semibold text-[18px]'>{pageTitle}</h2>
                    </div>

                    {/* Icons */}
                    <div className='flex flex-row-reverse items-center gap-4'>
                        <Rating rate={5} />

                        <div className='shadow-sm rounded-full'>
                            <ProfileDropdown />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
