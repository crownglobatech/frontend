
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface ViewOverTime {
  day: string;
  date: string;
  views: number | string;
}

interface AdChartProps {
  data?: ViewOverTime[];
  selectedTimeRange?: string;
  onTimeRangeChange?: (range: string) => void;
  loading?: boolean;
}

export default function AdChart({ data, selectedTimeRange, onTimeRangeChange, loading }: AdChartProps) {
  // Pass correct data from parent or use fallback
  const chartData = data?.map(item => ({
    ...item,
    views: Number(item.views) // Ensure views is a number
  })) || [];

  return (
    <div className="flex flex-col gap-8 px-2 py-2 rounded-md bg-white opacity-0 animate-[slideIn_0.8s_ease-out_forwards]">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[14px] text-black">
          Ad Views Over Time
        </h2>
        <Select
          value={selectedTimeRange}
          onValueChange={onTimeRangeChange}
          disabled={loading}
        >
          <SelectTrigger className="min-w-[120px] h-8 text-[12px] border-[var(--foundation-neutral-6)]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="last_week">Last Week</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="last_month">Last Month</SelectItem>
            <SelectItem value="this_year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-[200px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: -20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
                cursor={{ stroke: 'var(--primary-color)', strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke="var(--primary-color)"
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--primary-color)", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                isAnimationActive={true}
                animationDuration={1500}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            No data available for this range
          </div>
        )}
      </div>
    </div>
  );
}

