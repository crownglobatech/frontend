"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface TotalBookingsProps {
  chartData: Record<string, number | string>;
}

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(221.2 83.2% 53.3%)",
  },
} satisfies ChartConfig;

export default function TotalBookings({ chartData }: TotalBookingsProps) {
  const data = Object.entries(chartData).map(([week, value]) => ({
    week,
    bookings: Number(value),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Bookings</CardTitle>
        <CardDescription>Weekly volume breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="bookings" fill="var(--color-bookings)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
