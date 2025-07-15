"use client";

import { Stats } from "../types";

interface StatsGridProps {
  stats: Stats;
}

function formatStatKey(key: string): string {
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const statsCount = Object.keys(stats).length;
  
  // Dynamic grid classes based on number of statistics
  const getGridClass = () => {
    if (statsCount <= 2) return "grid-cols-1 md:grid-cols-2";
    if (statsCount === 3) return "grid-cols-1 md:grid-cols-3";
    if (statsCount === 4) return "grid-cols-2 md:grid-cols-4";
    if (statsCount === 5) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
    if (statsCount === 6) return "grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    // For more than 6, use flexible grid that wraps
    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6";
  };

  return (
    <div className={`grid ${getGridClass()} gap-2 h-full overflow-hidden`}>
      {Object.entries(stats).map(([key, value]) => (
        <div
          key={key}
          className="bg-gray-800 rounded-lg flex flex-col items-center justify-center p-2 text-center min-h-0"
        >
          <p className="text-[clamp(0.6rem,1vw,0.9rem)] text-gray-400">
            {formatStatKey(key)}
          </p>
          <p className="text-[clamp(1rem,1.8vw,1.8rem)] font-bold">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}
