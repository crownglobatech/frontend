
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
                <div className="flex justify-between items-center">
                    <Skeleton className="w-96 h-4" />
                    <Skeleton className="w-[140px] h-9" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-center justify-center mt-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-white border border-[var(--foundation-neutral-6)] rounded-sm px-4 py-4 shadow-sm h-[100px] flex flex-col justify-center gap-2">
                            <Skeleton className="w-24 h-4" />
                            <Skeleton className="w-16 h-8" />
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-screen-xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-fr">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg p-4 h-[300px] border shadow-sm">
                            <div className="flex justify-between items-center mb-4">
                                <Skeleton className="w-32 h-6" />
                                <Skeleton className="w-24 h-8" />
                            </div>
                            <Skeleton className="w-full h-[200px]" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
