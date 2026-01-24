"use client";
import Image from "next/image";
import Rating from "@/app/components/general/Rating";
import { use, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { getAdById } from "@/lib/api";
import AdDetails from "@/app/components/pages/vendor-dashboard/ads/AdDetail";
import EditAd from "@/app/components/pages/vendor-dashboard/ads/EditAd";
import { useNotification } from "@/app/contexts/NotificationProvider";
import LoadingDots from "@/app/components/general/LoadingDots";
import Loading from "./loading";
import { useRouter } from "next/navigation";
import { Ad } from "@/lib/types";
import { logger } from "@/lib/logger";
import Link from "next/link";
import ProfileDropDown from "@/app/components/pages/vendor-dashboard/ProfileDropDown";
import NotificationDropDown from "@/app/(customer)/dashboard/components/NotificationDropDown";
import NotificationDropdown from "@/app/components/pages/vendor-dashboard/NotificationDropdown";

interface Props {
  params: Promise<{ ad: string }>;
}

export default function ManageAd({ params }: Props) {
  const { ad } = use(params);
  const [loading, setLoading] = useState(true);
  const [adData, setAdData] = useState<Ad>();
  const { notify } = useNotification();
  const router = useRouter();

  const fetchAd = async () => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("User not authenticated.");

      const res = await getAdById(token, ad);
      if (res.data) setAdData(res.data);
      logger.log(res.data)
    } catch (err) {
      logger.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAd();
  }, [ad]);

  if (loading) return <Loading />;
  if (!adData)
    return (
      <div className="flex justify-center items-center p-6 text-[var(--danger-color)]">
        Ad not found.
      </div>
    );

  // handle Delete Ad
  const handleDeleteAd = async () => {
    setLoading(true);
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this ad? This action cannot be undone."
    );
    if (!confirmDelete) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        notify("User not authenticated.", "error");
        setLoading(false);
        return;
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/service-provider/ads/${adData.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (!res.ok) {
        notify(data.message || "Failed to delete ad.", "error");
        return;
      }

      notify(
        data.message || "Ad deleted successfully.",
        "success",
        "Ad Deleted"
      );
      router.replace("/provider/ads");
    } catch (error) {
      logger.error(error);
      notify("Something went wrong while deleting the ad.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="top-0 z-[1000] sticky w-full">
        <div className="bg-white shadow-lg px-6 py-4 w-full">
          {/* Top bar */}
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[20px]">Manage Ad</h2>

            {/* Icons */}
            <div className="flex flex-row-reverse items-center gap-4">
              <Rating rate={5} />

              <div className="shadow-md rounded-full">
                <ProfileDropDown />
              </div>
              <div className="shadow-md rounded-full">
               <NotificationDropdown />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-[12px] text-[var(--foundation-neutral-6)]">
            <Link href="/provider/ads">My Ad /{" "}</Link>
            <span className="text-black">Manage Ad: {adData.title}</span>
          </h2>
          <button
            onClick={handleDeleteAd}
            className="px-4 py-2 border border-[var(--danger-color)] rounded-md min-h-[40px] font-semibold text-[12px] text-[var(--danger-color)] cursor-pointer"
          >
            {loading ? <LoadingDots /> : "Delete Ad"}
          </button>
        </div>

        <div className="flex items-start gap-8 mt-2 w-full">
          <div className="w-[70%]">
            <AdDetails adData={adData} />
          </div>
          <div className="w-[30%]">
            <EditAd adData={adData} onUpdate={fetchAd} />
          </div>
        </div>
      </div>
    </>
  );
}
