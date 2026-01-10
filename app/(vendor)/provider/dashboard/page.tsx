"use client";
import AdChart from "@/app/components/general/AdChart";
import Loader from "@/app/components/general/Loader";
import HeaderBanner from "@/app/components/pages/vendor-dashboard/HeadBanner";
import QuickActions from "@/app/components/pages/vendor-dashboard/QuickActions";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { getDashboardData } from "@/lib/api";
import { DashboardResponse } from "@/lib/types";
import { useEffect, useState } from "react";
import CustomerRecentActivities from "./components/RecentActivities";
import CustomerRatingAndFeedbacks from "./components/Ratings";
import { logger } from "@/lib/logger";

export default function VendorDashboard() {
  const { notify } = useNotification();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [dashbaordData, setDashboardData] = useState<DashboardResponse>();
  const [filter, setFilter] = useState("this_week");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("User not authenticated");
        // Pass the filter to the API call
        const res = await getDashboardData(token, filter);
        setDashboardData(res);
      } catch (error: unknown) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch data";
        notify(errorMessage, "error", "Error");
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [filter]); // Re-fetch when filter changes

  if (loading && !dashbaordData) {
    return <div className="h-screen flex items-center justify-center"><Loader /></div>;
  }
  logger.log(dashbaordData?.data)

  return (
    <>
      <div className="top-0 sticky w-full z-10">
        <HeaderBanner />
      </div>
      <div className="flex flex-col gap-2 px-6 py-4">
        <div className="flex gap-4 mt-2">
          <div className="mt-2 w-[60%]">
            <QuickActions />
          </div>
          {/* notifications */}
          <div className="flex flex-col mt-2 p-4 border border-[var(--foundation-neutral-6)] rounded-md w-[40%] min-h-[50%]">
            <h2 className="mb-4 font-semibold text-[16px] text-[var(--heading-color)]">
              Recent Activities
            </h2>
            <div className="flex flex-1 justify-start items-start">
              {dashbaordData?.data?.recent_activities && (
                <CustomerRecentActivities
                  recentActivities={dashbaordData?.data?.recent_activities}
                />
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          {/* ad chart */}
          <div className="mt-4 w-[60%] border border-[var(--foundation-neutral-6)] rounded-md">
            <AdChart
              data={dashbaordData?.data.views_over_time}
              selectedTimeRange={filter}
              onTimeRangeChange={setFilter}
              loading={loading}
            />
          </div>
          {/* ratings */}
          <div className="flex flex-col mt-2 p-4 border border-[var(--foundation-neutral-6)] rounded-md w-[40%] min-h-[50%]">
            <h2 className="mb-4 font-semibold text-[16px] text-[var(--heading-color)]">
              Ratings & Feedbacks
            </h2>
            <div className="flex flex-1 justify-center items-center">
              <CustomerRatingAndFeedbacks
                ratings_feedbacks={dashbaordData?.data.ratings_feedbacks}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
