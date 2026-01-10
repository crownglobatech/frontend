"use client";
import { CheckCircle2, Eye, AlertTriangle, Circle } from "lucide-react";
import React from "react";

export interface Activity {
  type: string;
  message: string;
  time: string;
  color: string;
}

interface RecentActivitiesProps {
  recentActivities: { [key: string]: Activity } | Activity[];
}

const getIcon = (type: string, color: string) => {
  if (type === "views" || color === "blue") {
    return <Eye className="w-5 h-5 text-blue-600" />;
  }
  if (type === "post" || color === "green") {
    return <CheckCircle2 className="w-5 h-5 text-green-600" />;
  }
  if (type === "warning" || color === "yellow") { // Assuming yellow/warning based on image
    return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
  }
  return <Circle className="w-5 h-5 text-gray-400" />;
};

export default function CustomerRecentActivities({
  recentActivities,
}: RecentActivitiesProps) {
  if (!recentActivities || Object.keys(recentActivities).length === 0) {
    return (
      <p className="text-sm text-[var(--text-color)]">
        No recent activities found.
      </p>
    );
  }

  const activitiesList = Array.isArray(recentActivities) 
    ? recentActivities 
    : Object.values(recentActivities);

  return (
    <div className="flex flex-col gap-4 pr-2 w-full max-h-60 overflow-y-auto scrollbar-hide py-2">
      {activitiesList.map((activity, index) => (
        <div className="flex items-start gap-3" key={index}>
          <div className="mt-1 flex-shrink-0">
             {getIcon(activity.type, activity.color)}
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="font-semibold text-[14px] text-[var(--heading-color)] leading-tight">
              {activity.message}
            </h2>
            <span className="text-[12px] text-gray-500 font-medium">
              {activity.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

