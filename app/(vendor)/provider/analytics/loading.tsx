
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className='top-0 sticky w-full z-[999]'>
                {/* HeadBanner Skeleton */}
                <div className="bg-white shadow-sm px-6 py-4 w-full">
                    <div className="flex justify-between items-center">
                        <Skeleton className="w-48 h-8" />
                        <div className="flex gap-4">
                            <Skeleton className="rounded-full w-10 h-10" />
                            <Skeleton className="rounded-full w-10 h-10" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-6'>
                {/* metrics and charts */}
                <div className='gap-4 grid grid-cols-1 md:grid-cols-2 w-full'>
                    <div className='gap-4 grid grid-cols-2'>
                        {/* 4 Metric Cards */}
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className='flex flex-col justify-start items-start px-6 py-4 border border-[var(--foundation-neutral-6)] rounded-md'
                            >
                                <Skeleton className='mb-2 w-24 h-4' />
                                <Skeleton className='w-16 h-8' />
                            </div>
                        ))}
                    </div>
                    {/* Chart Skeleton */}
                    <div className='flex flex-col gap-8 px-4 py-2 border border-[var(--foundation-neutral-6)] overflow-hidden rounded-md h-[300px]'>
                        <div className="flex justify-between items-center mb-4">
                            <Skeleton className="w-32 h-6" />
                            <Skeleton className="w-24 h-8" />
                        </div>
                        <Skeleton className="w-full h-full" />
                    </div>
                </div>

                {/* Analytics Table Skeleton */}
                <div className="mt-8 border border-[var(--foundation-neutral-6)] rounded-md overflow-hidden">
                    {/* Table Header */}
                    <div className="bg-gray-50 p-4 border-b">
                        <div className="grid grid-cols-5 gap-4">
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                            <Skeleton className="w-full h-6" />
                        </div>
                    </div>
                    {/* Table Rows */}
                    <div className="p-4 space-y-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="grid grid-cols-5 gap-4">
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-full h-4" />
                                <Skeleton className="w-full h-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
