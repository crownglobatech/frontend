"use client";
import ApartmentCardSkeleton from "@/app/components/general/ApartmentCardSkeleton";
import AdCard from "@/app/components/pages/vendor-dashboard/ads/AdCard";
import AdFilter from "@/app/components/pages/vendor-dashboard/ads/AdFilter";
import HeaderBanner from "@/app/components/pages/vendor-dashboard/ads/HeaderBanner";
import { getAllAds } from "@/lib/api";
import { Ad, AllAdsResponse } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logger } from "@/lib/logger";
import { useQuery } from "@tanstack/react-query";
import { useNotification } from "@/app/contexts/NotificationProvider";

export default function AllAds() {
  const { notify } = useNotification();
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"all" | "newest" | "oldest">("all");

  const {
    data: adsData,
    isLoading,
    isError,
    error
  } = useQuery<AllAdsResponse>({
    queryKey: ["all-ads"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not authenticated");
      return getAllAds(token);
    },
    staleTime: 60 * 1000
  });

  useEffect(() => {
    if (adsData?.data?.data) {
      setAds(adsData.data.data);
    }
  }, [adsData]);

  useEffect(() => {
    if (!isError) return;
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch ads";
    notify(errorMessage, "error", "Error");
    logger.error(errorMessage);
  }, [error, isError, notify]);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    let result = ads;

    // 🔍 search filter
    if (query) {
      result = ads.filter(
        (ad) =>
          ad.title?.toLowerCase().includes(query) ||
          ad.area.toLowerCase().includes(query) ||
          ad.business.business_name.toLowerCase().includes(query) ||
          ad.description.toLowerCase().includes(query) ||
          ad.listing_type.toLowerCase().includes(query) ||
          ad.price.includes(query) ||
          ad.street.toLowerCase().includes(query)
      );
    }

    //  sorting
    if (sortBy === "newest") {
      result = [...result].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );
    }

    if (sortBy === "oldest") {
      result = [...result].sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      );
    }

    setFilteredAds(result);
  }, [searchQuery, ads, sortBy]);

  if (isLoading && ads.length === 0) {
    return (
      <>
        <div className="top-0 z-[1000] sticky w-full">
          <HeaderBanner query={searchQuery} setQuery={setSearchQuery} />
        </div>
        <div className="px-6 mb-4">
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <ApartmentCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="top-0 z-[1000] sticky w-full">
        <HeaderBanner query={searchQuery} setQuery={setSearchQuery} />
      </div>
      {/* sort and filters */}
      <div className="px-6 py-6">
        <AdFilter sortBy={sortBy} onChangeSort={setSortBy} />
      </div>
      {/* Ad Display */}
      <div className="px-6 mb-4">
        {filteredAds.length === 0 ? (
          <div className="flex flex-col h-[50vh] justify-center items-center py-10 text-center">
            <p className="mb-2 font-medium text-gray-600 text-lg">
              No ads found
            </p>
            <p className="text-gray-500 text-sm">
              Try adjusting your filters or search criteria or check your
              internet connection
            </p>
          </div>
        ) : (
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredAds.map((listing, index) => (
              <Link href={`/provider/ads/${listing.id}`} key={index}>
                <AdCard
                  baths={listing.bathrooms}
                  beds={listing.bedrooms}
                  image={listing.photo_urls[0]}
                  location={listing.area}
                  price={listing.price}
                  date={new Date(listing.created_at).toLocaleDateString(
                    "en-GB"
                  )}
                  status={listing.status}
                  title={listing.title}
                  rating={4.3}
                  state={listing.state}
                  category={listing?.category?.name}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
