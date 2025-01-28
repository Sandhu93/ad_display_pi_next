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
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 h-full overflow-hidden">
      {Object.entries(stats).map(([key, value]) => (
        <div
          key={key}
          className="bg-gray-800 rounded-lg flex flex-col items-center justify-center p-2 text-center"
        >
          <p className="text-xs text-gray-400">{formatStatKey(key)}</p>
          <p className="text-sm font-bold">{value}</p>
        </div>
      ))}
    </div>
  );
}
