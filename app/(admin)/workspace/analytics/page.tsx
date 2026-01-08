"use client";
import { useEffect, useState } from "react";
import LoadingSpinner from "@/app/components/general/LoadingSpinner";
import Header from "../components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAdminAnalytics } from "@/lib/api/admin";
import { useNotification } from "@/app/contexts/NotificationProvider";
import Revenue from "./charts/Revenue";
import DailyActiveUsers from "./charts/DailyActiveUsers";
import TotalBookings from "./charts/TotalBookings";
import TopCategories from "./charts/TopCategories";
import { logger } from "@/lib/logger";

export default function AdminAnalytics() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const [timeFilter, setTimeFilter] = useState("week");
  const [data, setData] = useState<any>(null);

  //   load data onmount
  useEffect(() => {
    const getAnalytics = async () => {
      setLoading(true);
      try {
        if (!token) {
          logger.error("User not authenticated.");
          notify("User not authenticated.", "error", "Error");
          setLoading(false);
          return;
        }
        const response = await getAdminAnalytics(token);
        setData(response);
      } catch (error) {
        error instanceof Error && notify(error.message, "error", "Error");
        logger.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    getAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        <LoadingSpinner size="lg" variant="primary" />
      </div>
    );
  const stats = data?.stats || {};
  const dashboardData = [
    {
      title: "Total Revenue",
      count: stats.total_revenue || "0",
    },
    {
      title: "Total Bookings",
      count: stats.total_bookings || "0",
    },
    {
      title: "Active Providers",
      count: stats.active_providers || "0",
    },
    {
      title: "New Customers",
      count: stats.new_customers || "0",
    },
  ];

  const charts = data?.charts || {};
  const revenueData = charts.revenue_trends || [];
  const dailyActiveUsersData = charts.daily_active_users || [];
  const totalBookingsData = charts.weekly_bookings || [];
  const topCategoriesData = charts.top_categories || [];

  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
    logger.log("Filter changed to:", value);
    // Add your filter logic here - you might want to refetch data with the filter
  };

  return (
    <div>
      <div className="top-0 z-[100] sticky w-full">
        <Header pageTitle="Analytics Overview" />
      </div>

      <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-6">
        <div className="flex justify-between items-center">
          <span className="text-black font-normal text-[14px]">
            View business analytics in different time series at a glance
          </span>

          <Select value={timeFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="text-[var(--text-body)] text-[12px] w-[140px]">
              <SelectValue placeholder="This Week" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-center justify-center mt-4">
          {dashboardData.map((data, index) => (
            <div
              key={index}
              className="bg-white border border-[var(--foundation-neutral-6)] rounded-sm px-4 py-4 shadow-sm"
            >
              <h2 className="font-normal text-[var(--text-body)] text-[12px]">
                {data.title}
              </h2>
              <p className="font-semibold text-[var(--heading-color)] text-[25px]">
                {data.count}
              </p>
            </div>
          ))}
        </div>

        <div className="w-full max-w-screen-xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-fr">
          <DailyActiveUsers chartData={dailyActiveUsersData} />
          <Revenue chartData={revenueData} />
          <TotalBookings chartData={totalBookingsData} />
          <TopCategories chartData={topCategoriesData} />
        </div>
      </section>
    </div>
  );
}
