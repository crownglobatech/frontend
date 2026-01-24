"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getDashboardData } from "@/lib/api";
import { DashboardResponse } from "@/lib/types";
import CustomerRecentActivities from "@/app/(vendor)/provider/dashboard/components/RecentActivities";
import { logger } from "@/lib/logger";
import { Bell } from "lucide-react";
export default function NotificationDropdown() {
    const [activities, setActivities] = useState<any[] | Record<string, any>>([]);
    const [loading, setLoading] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(false);

    useEffect(() => {
        const fetchActivities = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                // Fetch dashboard data with default filter
                const res = await getDashboardData(token, "this_week");
                const recent = res?.data?.recent_activities;

                if (recent) {
                    setActivities(recent);
                    // Check if there are any activities to show red dot
                    const count = Array.isArray(recent)
                        ? recent.length
                        : Object.keys(recent).length;
                    setHasNotifications(count > 0);
                }
            } catch (error) {
                logger.error("Failed to fetch notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchActivities();
        // Optional: Set up interval for polling updates
        const interval = setInterval(fetchActivities, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="relative cursor-pointer">
                    {/* <Image
                        src="/notify.png"
                        alt="notifications"
                        height={40}
                        width={40}
                        className="object-contain"
                    /> */}
                    <Bell size={35}  className=""/>
                    {hasNotifications && (
                        <div className="top-0 right-0 absolute bg-red-500 rounded-full w-3 h-3 border-2 border-white" />
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 w-80 z-[1000]" align="end" forceMount>
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-[16px] text-[var(--heading-color)]">
                        Recent Activities
                    </h2>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500 text-sm">Loading...</div>
                    ) : (
                        <div className="p-2">
                            <CustomerRecentActivities recentActivities={activities} />
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
