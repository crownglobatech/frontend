"use client";

import { useEffect, useState } from "react";
import { getCustomerAds, getCustomerAdsNoAuth } from "@/lib/api";
import { CustomerAd, CustomerAdsResponse } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomerHeader from "./CustomerHeader";
import AdDisplay from "./AdDisplay";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";

export default function DashboardComponent() {
  const [token, setToken] = useState<string | null | undefined>(undefined);
  const [error, setError] = useState<string | null>("");
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "all",
  );
  const [query, setQuery] = useState<string>(searchParams.get("search") || "");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filters, setFilters] = useState<
    Record<string, string | { min?: number; max?: number }>
  >(() => {
    const initialFilters: Record<
      string,
      string | { min?: number; max?: number }
    > = {};
    const loc = searchParams.get("location");
    const pType = searchParams.get("property_type");
    const lType = searchParams.get("listing_type");
    const pMin = searchParams.get("price_min");
    const pMax = searchParams.get("price_max");

    if (loc) initialFilters.location = loc;
    if (pType) initialFilters.property_type = pType;
    if (lType) initialFilters.listing_type = lType;
    if (pMin || pMax) {
      initialFilters.price = {
        min: pMin ? Number(pMin) : undefined,
        max: pMax ? Number(pMax) : undefined,
      };
    }
    return initialFilters;
  });
  const [ads, setAds] = useState<CustomerAd[] | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(0);
  const router = useRouter();
  const pathname = usePathname();
  const [paginatedAds, setPaginatedAds] = useState<CustomerAdsResponse | null>(
    null,
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, query, filters]);

  useEffect(() => {
    setIsInitialLoad(true);
  }, [category, query, filters, currentPage]);

  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);

  const buildQueryParams = (): URLSearchParams => {
    const params = new URLSearchParams(searchParams.toString());
    const KNOWN_FILTERS = [
      "price",
      "location",
      "property_type",
      "listing_type",
      "category",
      "page",
    ];

    // Clean old params
    KNOWN_FILTERS.forEach((key) => {
      params.delete(key);
      params.delete(`${key}_min`);
      params.delete(`${key}_max`);
    });

    // Rebuild
    if (category && category !== "all") params.set("category", category);
    if (query) params.set("search", query);
    else params.delete("search");

    Object.entries(filters).forEach(([key, value]) => {
      if (key === "category" && value === "all") return;
      if (typeof value === "string" && value) {
        params.set(key, value);
      } else if (typeof value === "object" && value) {
        if (value.min != null) params.set(`${key}_min`, String(value.min));
        if (value.max != null) params.set(`${key}_max`, String(value.max));
      }
    });

    params.set("page", String(currentPage));
    return params;
  };

  // main function
  const {
    data: adsResponse,
    isLoading,
    isFetching,
    isError,
    error: queryError,
  } = useQuery<CustomerAdsResponse>({
    queryKey: ["customer-ads", category, query, filters, currentPage, token],
    queryFn: async () => {
      if (token) {
        return getCustomerAds(token, category, currentPage, { query, filters });
      }
      return getCustomerAdsNoAuth(category, { query, filters });
    },
    enabled: token !== undefined,
    staleTime: 60 * 1000,
    refetchInterval: 20 * 1000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });

  useEffect(() => {
    const params = buildQueryParams();
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [category, query, filters, currentPage, pathname, router]);

  useEffect(() => {
    setError(null);
    if (adsResponse?.data) {
      setAds(adsResponse.data.data ?? []);
      setLastPage(Number(adsResponse.data.last_page) || 1);
      setTotalResults(Number(adsResponse.data.total) || 0);
      setPaginatedAds(adsResponse);
    }
  }, [adsResponse]);

  useEffect(() => {
    if (!isError) return;
    setError(
      !navigator.onLine
        ? "No internet connection"
        : queryError instanceof Error
          ? queryError.message
          : "Failed to load listings. Please try again.",
    );
  }, [isError, queryError]);

  useEffect(() => {
    if (isInitialLoad && !adsResponse) {
      setAds(null);
    }
  }, [isInitialLoad, adsResponse]);

  useEffect(() => {
    if (token === undefined) return;
    if (!isLoading && !isFetching) {
      setIsInitialLoad(false);
    }
  }, [isLoading, isFetching, token]);

  return (
    <div className="">
      <div className="top-0 z-[50] sticky w-full">
        <CustomerHeader
          currentCategory={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
          filters={filters}
          setFilters={setFilters}
          totalResults={totalResults}
        />
      </div>
      <div className="px-6">
        <AdDisplay
          ads={ads}
          loading={isLoading}
          error={error}
          isInitialLoad={isInitialLoad}
        />
      </div>
      {ads && ads.length > 0 && paginatedAds && (
        <div className="mb-4">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={(page) => {
              if (page === currentPage) return;
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", String(page));
              setCurrentPage(page);
            }}
          />
        </div>
      )}
    </div>
  );
}
