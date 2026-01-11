"use client";
import Loading from "./loading";
import Header from "../components/Header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ActivityTable from "./components/ActivityTable";
import { useEffect, useState } from "react";
import { useNotification } from "@/app/contexts/NotificationProvider";
import { getAdminDashboardData } from "@/lib/api/admin";
import { logger } from "@/lib/logger";
export default function AdminDashboard() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();
  const [metrics, setMetrics] = useState<any>(null);
  const [recentActivities, setRecentActivities] = useState<any>(null);
  const [timeFilter, setTimeFilter] = useState("week");

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        if (!token) {
          setLoading(false);
          notify("User not authenticated", "error", "Authentication Error");
          return;
        }
        const response = await getAdminDashboardData(token);
        setMetrics(response?.data?.metrics);
        setRecentActivities(response?.data?.recent_activities);
      } catch (error) {
        error instanceof Error && notify(error.message, "error", "Error");
        logger.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [token]);
  const dashboardData = [
    {
      title: "Total Users",
      count: metrics?.total_users || 0,
    },
    {
      title: "Total Vendors",
      count: metrics?.total_vendors || 0,
    },
    {
      title: "Active Bookings",
      count: metrics?.active_bookings || 0,
    },
    {
      title: "Pending Verification",
      count: metrics?.pending_verifications || 0,
    },
  ];
  const handleFilterChange = (value: string) => {
    setTimeFilter(value);
    logger.log("Filter changed to:", value);
    // Add your filter logic here - you might want to refetch data with the filter
  };

  // ... imports

  // ... inside component
  if (loading)
    return <Loading />;
  return (
    <div>
      <div className="top-0 z-[100] sticky w-full">
        <Header pageTitle="Dashboard Overview" />
      </div>
      {/* content */}
      <section className="bg-[#F5F5F5] min-h-[90vh] w-full p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full items-center justify-center">
          {dashboardData.map((data, index) => (
            <div
              key={index}
              className="bg-white border border-[var(--foundation-neutral-6)] rounded-sm px-4 py-4 shadow-sm"
            >
              <h2 className="font-semibold text-black text-[12px]">
                {data.title}
              </h2>
              <p className="font-semibold text-black text-[25px]">
                {data.count}
              </p>
            </div>
          ))}
        </div>

        {/* overview table */}
        <div className="bg-white rounded-sm p-4 mt-8 w-full">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-[14px]">Recent Activities</h2>
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
          {/* table */}
          <div className="mt-2">
            <ActivityTable recentActivities={recentActivities} />
          </div>
        </div>
      </section>
    </div>
  );
}
