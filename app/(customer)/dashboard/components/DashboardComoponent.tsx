"use client";

import { useEffect, useState } from "react";
import { getCustomerAds, getCustomerAdsNoAuth } from "@/lib/api";
import { CustomerAd, CustomerAdsResponse } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CustomerHeader from "./CustomerHeader";
import AdDisplay from "./AdDisplay";
import Pagination from "./Pagination";

export default function DashboardComponent() {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>("");
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [filters, setFilters] = useState<
    Record<string, string | { min?: number; max?: number }>
  >({});
  const [ads, setAds] = useState<CustomerAd[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState<number | null>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [paginatedAds, setPaginatedAds] = useState<CustomerAdsResponse | null>(
    null
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [category, query, filters]);

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

  useEffect(() => {
    if (token === undefined) return;
    const fetchAds = async () => {
      setLoading(true);
      setError(null);
      const params = buildQueryParams();
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });

      try {
        let res;
        if (token) {
          res = await getCustomerAds(token, category, currentPage, {
            query,
            filters,
          });
        } else {
          res = await getCustomerAdsNoAuth(category, { query, filters });
        }
        if (res && res.data) {
          setAds(res.data.data ?? []);
          setCurrentPage(Number(res.data.current_page) || 1);
          setLastPage(Number(res.data.last_page) || 1);
          setTotalResults(Number(res.data.total) || 0);
          setPaginatedAds(res);
        }
      } catch (err) {
        setError(
          !navigator.onLine
            ? "No internet connection"
            : "Failed to load listings. Please try again."
        );
        console.error("Error fetching ads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [category, query, filters, currentPage]);
  console.log(ads);
  console.log(paginatedAds);

  return (
    <div>
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
        <AdDisplay ads={ads} loading={loading} error={error} />
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
