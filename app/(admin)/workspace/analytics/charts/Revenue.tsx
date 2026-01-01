"use client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface RevenueProps {
  chartData: Record<string, number | string>;
}

export default function Revenue({ chartData }: RevenueProps) {
  // Transform data to array of objects for Recharts
  const data = Object.entries(chartData).map(([date, revenue]) => ({
    date: new Date(date),
    revenue: Number(revenue),
  }));

  // Get primary color from CSS variable
  const primaryColor = "#1E5AA8";

  // Format X-axis labels
  const formatXAxis = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  // Y-axis tick formatter
  const formatYAxis = (value?: number) => {
    if (value === undefined) return "";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
    return value.toString();
  };

  // Tooltip formatter
  const tooltipFormatter = (value?: number) => {
    if (value === undefined) return "";
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + "M";
    if (value >= 1_000) return (value / 1_000).toFixed(1) + "k";
    return value.toString();
  };

  return (
    <div className="w-full h-[400px] flex flex-col">
      {/* Heading */}
      <div className="px-6 py-2">
        <h3 className="text-[16px] font-semibold text-[var(--heading-color)]">
          Revenue Trends
        </h3>
        <span className="text-[14px] text-[var(--text-body)]">
          Revenue trends over time.
        </span>
      </div>

      {/* Chart fills remaining space */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              tick={{ fontSize: 12 }}
              minTickGap={20}
            />
            <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 12 }} />
            <Tooltip
              formatter={tooltipFormatter}
              labelFormatter={(label: Date) =>
                label.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              }
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke={primaryColor}
              strokeWidth={3}
              dot={{ r: 5, stroke: primaryColor, strokeWidth: 2, fill: "#fff" }}
            />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={primaryColor} stopOpacity={0.4} />
                <stop
                  offset="95%"
                  stopColor={primaryColor}
                  stopOpacity={0.05}
                />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
