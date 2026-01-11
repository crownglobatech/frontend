import ApartmentCardSkeleton from "@/app/components/general/ApartmentCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="w-full">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm mb-4">
                {/* Top Bar */}
                <div className="flex justify-between gap-[50px] px-6 py-4">
                    <div className="flex gap-2 w-full">
                        <Skeleton className="w-24 h-9" />
                        <Skeleton className="w-full h-9" />
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="rounded-full w-10 h-10" />
                        <Skeleton className="rounded-full w-10 h-10" />
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="px-6 py-2 border-t">
                    <div className="flex gap-6 mb-2 text-sm overflow-x-auto">
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-20 h-6" />
                        <Skeleton className="w-20 h-6" />
                    </div>
                    {/* Filter Bar */}
                    <div className="flex gap-4 mt-2">
                        <Skeleton className="w-32 h-8" />
                        <Skeleton className="w-32 h-8" />
                        <Skeleton className="w-32 h-8" />
                        <Skeleton className="w-32 h-8" />
                    </div>
                </div>
            </div>

            {/* Ads Grid Skeleton */}
            <div className="px-6">
                <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {[...Array(6)].map((_, i) => (
                        <ApartmentCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </div>
    );
}
