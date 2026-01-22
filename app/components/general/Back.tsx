'use client'
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"
export default function BackButton() {
    const router = useRouter()
    return (
        <ChevronLeftIcon className="cursor-pointer" size={30} onClick={() => router.back()} />
    )
}