
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <>
            <div className="top-0 z-[1000] sticky w-full">
                <div className="bg-white shadow-lg px-6 py-4 w-full">
                    {/* Top bar Skeleton */}
                    <div className="flex justify-between items-center">
                        <Skeleton className="w-32 h-8" />
                        <div className="flex flex-row-reverse items-center gap-4">
                            <Skeleton className="rounded-full w-10 h-10" />
                            <Skeleton className="rounded-full w-10 h-10" />
                            <Skeleton className="w-24 h-6" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <Skeleton className="w-64 h-6" />
                    <Skeleton className="rounded-md w-32 h-10" />
                </div>

                <div className="flex items-start gap-8 mt-2 w-full">
                    {/* Ad Details Column Skeleton */}
                    <div className="space-y-6 w-[70%]">
                        <Skeleton className="rounded-md w-full h-[300px]" />
                        <div className="space-y-4">
                            <Skeleton className="w-1/2 h-8" />
                            <Skeleton className="w-full h-24" />
                        </div>
                    </div>

                    {/* Edit Ad Form Column Skeleton */}
                    <div className="space-y-4 w-[30%]">
                        <Skeleton className="rounded-md w-full h-12" />
                        <Skeleton className="rounded-md w-full h-12" />
                        <Skeleton className="rounded-md w-full h-12" />
                        <Skeleton className="rounded-md w-full h-12" />
                        <Skeleton className="rounded-md w-full h-32" />
                        <Skeleton className="rounded-md w-full h-12" />
                    </div>
                </div>
            </div>
        </>
    );
}
