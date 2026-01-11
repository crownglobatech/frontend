
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full">
            {/* Top Bar Skeleton */}
            <div className="flex justify-between gap-[50px] bg-white shadow-sm mb-6 px-6 py-4">
                <div className="flex gap-2 w-full">
                    <Skeleton className="w-[100px] h-9" />
                    <Skeleton className="w-full h-9" />
                </div>
            </div>

            <div className="flex flex-col px-6">
                {/* Hero Image Skeleton */}
                <div className="rounded-md w-full">
                    <Skeleton className="rounded-md w-full h-[250px]" />
                </div>

                <div className="mt-4">
                    {/* Location */}
                    <div className="flex items-center gap-1 mb-2">
                        <Skeleton className="rounded-full w-4 h-4" />
                        <Skeleton className="w-32 h-3" />
                    </div>

                    {/* Title & Price */}
                    <div className="flex justify-between mt-1">
                        <Skeleton className="w-1/2 h-8" />
                        <Skeleton className="w-32 h-8" />
                    </div>
                </div>

                {/* Provider Profile Skeleton */}
                <div className="relative flex items-center gap-4 mt-6">
                    <div className="flex items-center gap-2">
                        <Skeleton className="rounded-full w-8 h-8" />
                        <Skeleton className="w-32 h-4" />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-24 h-4" />
                    </div>
                </div>

                <div className="flex flex-col gap-4 mt-8 mb-8 w-[60%]">
                    {/* Description Skeleton */}
                    <div className="flex flex-col items-start gap-2">
                        <Skeleton className="w-48 h-6" />
                        <div className="space-y-2 w-full">
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-full h-3" />
                            <Skeleton className="w-3/4 h-3" />
                        </div>
                    </div>

                    {/* Features Skeleton */}
                    <div className="flex gap-4 mt-2">
                        <Skeleton className="rounded-md w-32 h-9" />
                        <Skeleton className="rounded-md w-32 h-9" />
                    </div>

                    {/* Gallery Skeleton */}
                    <div className="flex flex-col items-start gap-4 mt-4">
                        <Skeleton className="w-32 h-6" />
                        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 w-full">
                            <Skeleton className="rounded-md w-full h-[260px]" />
                            <Skeleton className="rounded-md w-full h-[260px]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
