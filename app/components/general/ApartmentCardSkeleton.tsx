import { Skeleton } from "@/components/ui/skeleton";

export default function ApartmentCardSkeleton() {
    return (
        <div className="bg-white shadow-md rounded-xl w-[320px] overflow-hidden">
            {/* Image Skeleton */}
            <div className="mx-2 my-2">
                <Skeleton className="rounded-md w-full h-45" />
            </div>

            {/* Content Skeleton */}
            <div className="space-y-3 p-3">
                {/* Location */}
                <div className="flex items-center gap-1">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="w-24 h-3" />
                </div>

                {/* Title & Rating */}
                <div className="flex justify-between items-center">
                    <Skeleton className="w-32 h-4" />
                    <Skeleton className="w-16 h-3" />
                </div>

                {/* Details (Beds/Baths) */}
                <div className="flex justify-between mt-2">
                    <Skeleton className="w-20 h-3" />
                    <Skeleton className="w-20 h-3" />
                </div>

                {/* Price & Button */}
                <div className="flex justify-between items-center mt-4">
                    <Skeleton className="w-24 h-6" />
                    <Skeleton className="rounded-md w-24 h-8" />
                </div>
            </div>
        </div>
    );
}
