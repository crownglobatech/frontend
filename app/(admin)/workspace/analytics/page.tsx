"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { Select, SelectTrigger } from "@/components/ui/select";
import Image from "next/image";
import { getAdminAnalytics } from "@/lib/api/admin";
import LoadingDots from "@/app/components/general/LoadingDots";
import { useNotification } from "@/app/contexts/NotificationProvider";
import Revenue from "./charts/Revenue";
import DailyActiveUsers from "./charts/DailyActiveUsers";
import TotalBookings from "./charts/TotalBookings";
import TopCategories from "./charts/TopCategories";

export default function AdminAnalytics() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const [data, setData] = useState<any>(null);

  //   load data onmount
  useEffect(() => {
    const getAnalytics = async () => {
      setLoading(true);
      try {
        if (!token) {
          console.error("User not authenticated.");
          notify("User not authenticated.", "error", "Error");
          setLoading(false);
          return;
        }
        const response = await getAdminAnalytics(token);
        console.log("Analytics Data:", response);
        setData(response);
      } catch (error) {
        error instanceof Error && notify(error.message, "error", "Error");
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    getAnalytics();
  }, []);

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center space-x-1">
        <span className="bg-[var(--primary-color)] rounded-full w-4 h-4 animate-bounceDot [animation-delay:-0.32s]"></span>
        <span className="bg-[var(--primary-color)] rounded-full w-4 h-4 animate-bounceDot [animation-delay:-0.16s]"></span>
        <span className="bg-[var(--primary-color)] rounded-full w-4 h-4 animate-bounceDot"></span>
      </div>
    );
  const stats = data?.stats || {};
  const dashboardData = [
    {
      title: "Total Revenue",
      count: stats.total_revenue || "N/A",
    },
    {
      title: "Total Bookings",
      count: stats.total_bookings || "N/A",
    },
    {
      title: "Active Providers",
      count: stats.active_providers || "N/A",
    },
    {
      title: "New Customers",
      count: stats.new_customers || "N/A",
    },
  ];

  const charts = data?.charts || {};
  const revenueData = charts.revenue_trends || [];
  const dailyActiveUsersData = charts.daily_active_users || [];
  const totalBookingsData = charts.weekly_bookings || [];
  const topCategoriesData = charts.top_categories || [];
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

          <Select>
            <SelectTrigger className="text-[var(--heading-color)] font-semibold text-[12px]">
              Last 30 Days
            </SelectTrigger>
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

        {/* metrics */}
        <div className="w-full max-w-screen-xl mx-auto mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2">
          {/* Active Users Chart */}
          <div className="w-full h-[400px] bg-white">
            <DailyActiveUsers chartData={dailyActiveUsersData} />
          </div>
          {/* Revenue Chart */}
          <div className="w-full h-[400px] bg-white">
            <Revenue chartData={revenueData} />
          </div>

          {/* Total Bookings Chart */}
          <div className="w-full h-[400px] bg-white">
            <TotalBookings chartData={totalBookingsData} />
          </div>

          {/* Top Categories Chart */}
          <div className="w-full h-[400px] bg-white">
            <TopCategories chartData={topCategoriesData} />
          </div>
        </div>
      </section>
    </div>
  );
}
