"use client";
import Loader from "@/app/components/general/Loader";
import AdCard from "@/app/components/pages/vendor-dashboard/ads/AdCard";
import AdFilter from "@/app/components/pages/vendor-dashboard/ads/AdFilter";
import HeaderBanner from "@/app/components/pages/vendor-dashboard/ads/HeaderBanner";
import { getAllAds } from "@/lib/api";
import { Ad } from "@/lib/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logger } from "@/lib/logger";

export default function AllAds() {
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");

        const data = await getAllAds(token);
        const adsData = data.data.data;
        setAds(adsData);
        setFilteredAds(adsData);
      } catch (err) {
        logger.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setFilteredAds(ads);
      return;
    }

    const filtered = ads.filter(
      (ad) =>
        ad.title?.toLowerCase().includes(query) ||
        ad.area.toLowerCase().includes(query) ||
        ad.business.business_name.toLowerCase().includes(query) ||
        ad.description.toLowerCase().includes(query) ||
        ad.listing_type.toLowerCase().includes(query) ||
        ad.price.includes(query) ||
        ad.street.toLowerCase().includes(query)
    );

    setFilteredAds(filtered);
  }, [searchQuery, ads]);

  if (loading) return <Loader />;

  return (
    <>
      <div className="top-0 z-[1000] sticky w-full">
        <HeaderBanner query={searchQuery} setQuery={setSearchQuery} />
      </div>
      {/* sort and filters */}
      <div className="px-6 py-6">
        <AdFilter />
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
                  rating={4.3}
                  date={new Date(listing.created_at).toLocaleDateString(
                    "en-GB"
                  )}
                  status={listing.status}
                  title={listing.title}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
