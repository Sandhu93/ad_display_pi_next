"use client";

import { useState, useEffect } from "react";
import { Clock as ClockIcon } from "lucide-react";

export default function Clock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString());
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2">
      <ClockIcon className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
      <time className="text-base md:text-lg lg:text-xl xl:text-2xl">
        {time}
      </time>
    </div>
  );
}
