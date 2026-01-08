"use client";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, PieChartIcon } from "lucide-react";
import { logger } from "@/lib/logger";

interface TopCategoriesProps {
  chartData: Record<string, number | string>;
}

const defaultColors = [
  "hsl(221.2 83.2% 53.3%)", // Primary blue
  "hsl(142.1 76.2% 36.3%)", // Green
  "hsl(262.1 83.3% 57.8%)", // Purple
  "hsl(346.8 77.2% 49.8%)", // Red
  "hsl(24.6 95% 53.1%)", // Orange
  "hsl(47.9 95.8% 53.1%)", // Yellow
];

export default function TopCategories({ chartData }: TopCategoriesProps) {
  const [animated, setAnimated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"bars" | "pie">("bars");

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const categories = Object.entries(chartData).map(([name, value], index) => ({
    name,
    value: Number(value),
    color: defaultColors[index % defaultColors.length],
  }));

  const sortedCategories = [...categories].sort((a, b) => b.value - a.value);

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(
      selectedCategory === categoryName ? null : categoryName
    );
    logger.log(`Selected category: ${categoryName}`);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Most requested services</CardDescription>
          </div>
          <div className="flex gap-1 rounded-lg border p-1">
            <button
              onClick={() => setViewMode("bars")}
              className={`p-2 rounded transition-colors ${viewMode === "bars"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
                }`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("pie")}
              className={`p-2 rounded transition-colors ${viewMode === "pie"
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
                }`}
            >
              <PieChartIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "bars" ? (
          <div className="space-y-4">
            {sortedCategories.map((cat, index) => (
              <div
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className={`space-y-2 cursor-pointer rounded-lg p-2 -mx-2 transition-all duration-200 ${selectedCategory === cat.name
                    ? "bg-muted scale-105"
                    : "hover:bg-muted/50"
                  }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full transition-transform duration-200 hover:scale-125"
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold tabular-nums">
                    {cat.value}%
                  </span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out hover:brightness-110"
                    style={{
                      width: animated ? `${cat.value}%` : "0%",
                      backgroundColor: cat.color,
                      transitionDelay: `${index * 100}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sortedCategories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={800}
              >
                {sortedCategories.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => handleCategoryClick(entry.name)}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

        {selectedCategory && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-sm">
            <span className="font-medium">Selected:</span> {selectedCategory}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
