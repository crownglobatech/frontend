
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div>
            <div className="top-0 z-[100] sticky w-full">
                <div className="bg-white px-8 py-4 border-b">
                    <Skeleton className="w-48 h-8" />
                </div>
            </div>
            <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-center justify-center">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white border border-[var(--foundation-neutral-6)] rounded-sm px-4 py-4 shadow-sm h-[100px] flex flex-col justify-center gap-2">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-16 h-8" />
                        </div>
                    ))}
                </div>

                {/* overview table */}
                <div className="bg-white rounded-sm p-4 mt-8 w-full">
                    <div className="flex justify-between items-center mb-4">
                        <Skeleton className="w-32 h-6" />
                        <Skeleton className="w-[140px] h-9" />
                    </div>
                    {/* table skeleton */}
                    <div className="space-y-4">
                        <div className="flex gap-4 border-b pb-2">
                            <Skeleton className="w-1/4 h-6" />
                            <Skeleton className="w-1/4 h-6" />
                            <Skeleton className="w-1/4 h-6" />
                            <Skeleton className="w-1/4 h-6" />
                        </div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex gap-4">
                                <Skeleton className="w-1/4 h-4" />
                                <Skeleton className="w-1/4 h-4" />
                                <Skeleton className="w-1/4 h-4" />
                                <Skeleton className="w-1/4 h-4" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
