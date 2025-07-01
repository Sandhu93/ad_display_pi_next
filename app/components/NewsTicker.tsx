"use client";

import { useEffect, useState } from "react";

interface NewsTickerProps {
  news: string[];
  speed?: number;
}

export default function NewsTicker({ news, speed = 50 }: NewsTickerProps) {
  const [position, setPosition] = useState(0);
  const combinedNews = news.join(" • ");

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        // Reset smoothly when the text has fully scrolled
        if (prev <= -100) return 0;
        return prev - 0.1;
      });
    };

    const animation = setInterval(animate, speed);
    return () => clearInterval(animation);
  }, [speed, combinedNews]);

  if (!news.length) return null;

  return (
    <div className="bg-blue-600 p-4 overflow-hidden whitespace-nowrap text-[clamp(1rem,2vw,2.5rem)] font-semibold relative">
      <div
        className="inline-block transition-transform duration-100 ease-linear"
        style={{ transform: `translateX(${position}%)` }}
      >
        <span className="pr-8">{combinedNews}</span>
        <span className="pr-8">{combinedNews}</span>
        <span className="pr-8">{combinedNews}</span>
      </div>
    </div>
  );
}

export function NewsTickerContainer({ headlines }: { headlines: string[] }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-600">
      <NewsTicker news={headlines} />
    </div>
  );
}
