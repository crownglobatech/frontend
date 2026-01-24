"use client";
import { formatPrice } from "@/lib/utils";
import ApartmentCard from "@/app/components/general/ApartmentCard";
import Loader from "@/app/components/general/Loader";
import { CustomerAd } from "@/lib/types";
import Link from "next/link";

interface AdDisplayProps {
  loading: boolean;
  ads: CustomerAd[] | null;
  error?: string | null;
  isInitialLoad: boolean;
}

import * as motion from "motion/react-client";
import ApartmentCardSkeleton from "@/app/components/general/ApartmentCardSkeleton";

interface AdDisplayProps {
  loading: boolean;
  ads: CustomerAd[] | null;
  error?: string | null;
  isInitialLoad: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function AdDisplay({
  loading,
  ads,
  error,
  isInitialLoad,
}: AdDisplayProps) {
  // Loading
  if (loading && isInitialLoad) {
    return (
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <ApartmentCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  //  Error
  if (error) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center py-40 text-center">
        <p className=" text-lg font-medium text-gray-600">
          Unable to load listings
        </p>
        <p className="text-sm text-gray-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-white font-semibold bg-[var(--primary-color)] rounded-sm px-4 py-1.5 cursor-pointer"
        >
          Retry
        </button>
      </div>
    );
  }

  // No results found (filters)
  if (!ads || ads.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-10 text-center">
        <p className="mb-2 font-medium text-gray-600 text-lg">
          No results found
        </p>
        <p className="text-gray-500 text-sm">
          Try adjusting your filters or search criteria.
        </p>
      </div>
    );
  }

  // Normal results
  return (
    <div className="">
      {loading && !isInitialLoad && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/70">
          <Loader />
        </div>
      )}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {ads?.map((ad) => (
          <div key={ad.id}>
            <Link href={`/dashboard/details/${ad.id}`}>
              <ApartmentCard
                baths={ad.bathrooms}
                beds={ad.bedrooms}
                image={
                  ad.photo_urls[0] ||
                  "https://placehold.co/600x400/eee/ccc?text=No+Image"
                }
                location={ad.area}
                price={ad.price}
                rating={ad.average_rating}
                title={ad.title}
                providerVerified={ad.business.is_verified === 1}
                status={ad.listing_type}
                state={ad.state}
                category={ad.business?.category?.name}
              />
            </Link>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
