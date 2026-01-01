"use client";
import { useEffect, useState } from "react";

interface TopCategoriesProps {
  chartData: Record<string, number | string>;
}

export default function TopCategories({ chartData }: TopCategoriesProps) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    setAnimated(true);
  }, []);

  const categories = [
    { name: "Plumbing", value: 45, color: "var(--primary-color)" },
    { name: "Home Cleaning", value: 28, color: "#1EA8A1" },
    { name: "Electrical Repair", value: 15, color: "#9439F6" },
    { name: "Furniture", value: 12, color: "#DD40F2" },
  ];

  return (
    <div className="w-full h-[400px] flex flex-col">
      {/* Heading */}
      <div className="px-6 py-2">
        <h3 className="text-[16px] font-semibold text-[var(--heading-color)]">
          Top Categories
        </h3>
        <span className="text-[14px] text-[var(--text-body)]">
          Most requested services
        </span>
      </div>

      <div className="flex flex-col gap-2 px-6 mt-4">
        {categories.map((cat) => (
          <div key={cat.name} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <h2 className="text-[var(--text-body)] font-semibold text-[14px]">
                {cat.name}
              </h2>
              <span className="text-[var(--text-body)] font-semibold text-[14px]">
                {cat.value}%
              </span>
            </div>
            <div className="bg-gray-200 w-full h-[16px] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-3000 ease-out"
                style={{
                  width: animated ? `${cat.value}%` : "0%",
                  backgroundColor: cat.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
