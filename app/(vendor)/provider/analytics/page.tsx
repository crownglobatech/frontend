"use client";
import { useNotification } from "@/app/contexts/NotificationProvider";
import AnalyticsTable from "./AnalyticsTable";
import HeadBanner from "./HeadBanner";
import AdChart from "@/app/components/general/AdChart";
import { useEffect, useState } from "react";
import { getVendorAnalytics } from "@/lib/api";
import Loading from "./loading";
import { AnalyticsApiResponse } from "@/lib/types";
import { formatK } from "@/lib/utils";
import { logger } from "@/lib/logger";
import { useQuery } from "@tanstack/react-query";

export default function Analytics() {
  const { notify } = useNotification();
  const [filter, setFilter] = useState("this_week");

  const {
    data: analytics,
    isLoading,
    isFetching,
    isError,
    error,
  } = useQuery<AnalyticsApiResponse>({
    queryKey: ["vendor-analytics", filter],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      return getVendorAnalytics(token, filter);
    },
    staleTime: 60 * 1000,
  });

  useEffect(() => {
    if (!isError) return;
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    notify(errorMessage, "error", "Error");
    logger.error("Error:", errorMessage);
  }, [error, isError, notify]);

  if (isLoading) {
    return <Loading />;
  }
  logger.log(analytics?.data);

  const metrics = analytics
    ? [
        {
          title: "Total Ads Posted",
          value: analytics?.data?.overview.total_ads_posted,
        },
        {
          title: "Total Views",
          value: formatK(analytics.data.overview.total_views),
        },
        {
          title: "Total Inquiries",
          value: formatK(analytics.data.overview.total_inquiries),
        },
        {
          title: "Conversion Rate",
          // Format the number to one decimal place and add a '%'
          value: `${analytics.data.overview.conversion_rate}`,
        },
      ]
    : [];

  return (
    <div>
      <div className="top-0 sticky w-full z-[999]">
        <HeadBanner />
      </div>
      <div className="p-6">
        {/* metrics and charts */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2 w-full">
          <div className="gap-4 grid grid-cols-2">
            {metrics.map((metric, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-col justify-start items-start px-6 py-4 border border-[var(--foundation-neutral-6)] rounded-md"
                >
                  <h2 className="font-semibold text-[14px]">{metric.title}</h2>
                  <span className="font-semibold text-[25px]">
                    {metric.value || 0}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-8 px-4 py-2 border border-[var(--foundation-neutral-6)] overflow-hidden rounded-md">
            <AdChart
              data={analytics?.data.ad_views_over_time}
              selectedTimeRange={filter}
              onTimeRangeChange={setFilter}
              loading={isFetching}
            />
          </div>
        </div>
        <div>
          <AnalyticsTable
            performanceData={analytics?.data.individual_ad_performance}
          />
        </div>
      </div>
    </div>
  );
}
