"use client";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  currentCategory: string;
  setCategory: (category: string) => void;
  query: string;
  setQuery: (query: string) => void;
  filters: Record<string, string | { min?: number; max?: number }>;
  setFilters: Dispatch<
    SetStateAction<Record<string, string | { min?: number; max?: number }>>
  >;
  totalResults: number | null;
}

export default function CustomerHeader({
  currentCategory,
  setCategory,
  query,
  setQuery,
  filters,
  setFilters,
  totalResults,
}: Props) {
  const handleFilterChange = (
    name: string,
    value: string | { min?: number; max?: number } | undefined
  ) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (!value || value === "__empty__") {
        delete updated[name];
      } else {
        updated[name] = value;
      }
      return updated;
    });
  };
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const role =
    typeof window != "undefined" ? localStorage.getItem("role") : null;

  useEffect(() => {
    const isLoggedIn = () => {
      if (!user || role !== "customer") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    };
    isLoggedIn();
  }, [user, role]);
  return (
    <div>
      {/* --- Top Bar --- */}
      <div className="flex justify-between gap-[50px] bg-white shadow-sm px-6 py-4">
        <div className="flex gap-2 w-full">
          <Input
            type="text"
            placeholder="Search for homes and services"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-sm w-full text-[12px] placeholder:text-[12px] placeholder:text-[#BFBFBF]"
          />
        </div>

        {isLoggedIn && (
          <div className="flex flex-row-reverse items-center gap-4">
            <Image
              src="/user.png"
              alt="profile"
              height={40}
              width={40}
              className="shadow-md rounded-full cursor-pointer"
            />
            <Image
              src="/notify.png"
              alt="notifications"
              height={40}
              width={40}
              className="shadow-md rounded-full cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* --- Category Navigation --- */}
      <div className="z-[50] relative flex flex-col bg-white px-6 overflow-visible">
        <div className="flex justify-between py-2 border-gray-300 border-b">
          <div className="flex items-center gap-6">
            {[
              { key: "all", label: "All Listings" },
              { key: "buy-homes", label: "Buy Homes" },
              { key: "rent-homes", label: "Rent Homes" },
              { key: "allied-services", label: "Allied Services" },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setCategory(item.key)}
                className={`font-medium text-sm transition cursor-pointer ${currentCategory === item.key
                  ? "text-[var(--primary-color)]"
                  : ""
                  }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 font-bold text-gray-800 text-sm cursor-pointer">
              Filters
              <span className="flex justify-center items-center bg-[var(--danger-color)] rounded-full w-5 h-5 font-bold text-white text-xs">
                {Object.keys(filters || {}).length}
              </span>
            </span>
          </div>
        </div>

        {/* --- Dropdown Filters --- */}
        <div className="relative flex flex-wrap gap-4 mt-2 overflow-visible">
          {/* Price Range */}
          <div className="relative w-[150px]">
            <Select
              value={
                filters.price ? JSON.stringify(filters.price) : "__empty__"
              }
              onValueChange={(val) =>
                handleFilterChange(
                  "price",
                  val === "__empty__" ? null : JSON.parse(val)
                )
              }
            >
              <SelectTrigger className="w-full font-semibold text-[12px] text-gray-800">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="__empty__">Price Range</SelectItem>
                <SelectItem value={JSON.stringify({ min: 0, max: 500000 })}>
                  Under ₦500k
                </SelectItem>
                <SelectItem value={JSON.stringify({ min: 500000, max: 1000000 })}>
                  ₦500k - ₦1m
                </SelectItem>
                <SelectItem value={JSON.stringify({ min: 1000000, max: 5000000 })}>
                  ₦1m - ₦5m
                </SelectItem>
                <SelectItem value={JSON.stringify({ min: 5000000, max: 10000000 })}>
                  ₦5m - ₦10m
                </SelectItem>
                <SelectItem value={JSON.stringify({ min: 10000000, max: 50000000 })}>
                  ₦10m - ₦50m
                </SelectItem>
                <SelectItem value={JSON.stringify({ min: 50000000, max: 100000000 })}>
                  ₦50m - ₦100m
                </SelectItem>
                <SelectItem value={JSON.stringify({ min: 100000000, max: undefined })}>
                  Above ₦100m
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Location */}
          <div className="relative w-[150px]">
            <Select
              value={(filters.location as string) || "__empty__"}
              onValueChange={(val) =>
                handleFilterChange("location", val === "__empty__" ? "" : val)
              }
            >
              <SelectTrigger className="w-full font-semibold text-[12px] text-gray-800">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="__empty__">Location</SelectItem>
                <SelectItem value="lekki">Lekki</SelectItem>
                <SelectItem value="ikeja">Ikeja</SelectItem>
                <SelectItem value="victoria island">Victoria Island</SelectItem>
                <SelectItem value="abuja">Abuja</SelectItem>
                <SelectItem value="yaba">Yaba</SelectItem>
                <SelectItem value="surulere">Surulere</SelectItem>
                <SelectItem value="ajah">Ajah</SelectItem>
                <SelectItem value="ikoyi">Ikoyi</SelectItem>
                <SelectItem value="magodo">Magodo</SelectItem>
                <SelectItem value="maryland">Maryland</SelectItem>
                <SelectItem value="gbagada">Gbagada</SelectItem>
                <SelectItem value="port harcourt">Port Harcourt</SelectItem>
                <SelectItem value="ibadan">Ibadan</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Property Type */}
          <div className="relative w-[150px]">
            <Select
              value={(filters.property_type as string) || "__empty__"}
              onValueChange={(val) =>
                handleFilterChange(
                  "property_type",
                  val === "__empty__" ? "" : val
                )
              }
            >
              <SelectTrigger className="w-full font-semibold text-[12px] text-gray-800">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="__empty__">Property Type</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="land">Land</SelectItem>
                <SelectItem value="duplex">Duplex</SelectItem>
                <SelectItem value="bungalow">Bungalow</SelectItem>
                <SelectItem value="shop">Shop</SelectItem>
                <SelectItem value="office">Office</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Service Type */}
          <div className="relative w-[150px]">
            <Select
              value={(filters.listing_type as string) || "__empty__"}
              onValueChange={(val) =>
                handleFilterChange(
                  "listing_type",
                  val === "__empty__" ? "" : val
                )
              }
            >
              <SelectTrigger className="w-full font-semibold text-[12px] text-gray-800">
                <SelectValue placeholder="Service Type" />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectItem value="__empty__">Service Type</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="lease">Lease</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* --- Result Count --- */}
        <span className="my-2 text-gray-500 text-sm">
          {totalResults || 0} results
        </span>
      </div>
    </div>
  );
}
