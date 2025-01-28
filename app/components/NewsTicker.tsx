"use client";

import { useEffect, useState } from "react";

interface NewsTickerProps {
  news: string[];
  speed?: number;
}

export default function NewsTicker({ news, speed = 30 }: NewsTickerProps) {
  const [position, setPosition] = useState(0);
  const combinedNews = news.join(" • ");

  useEffect(() => {
    const animate = () => {
      setPosition((prev) => {
        if (prev <= -100) return 100;
        return prev - 0.05;
      });
    };

    const animation = setInterval(animate, speed);
    return () => clearInterval(animation);
  }, [speed]);

  return (
    <div className="bg-blue-600 p-4 overflow-hidden whitespace-nowrap">
      <div
        className="inline-block"
        style={{ transform: `translateX(${position}%)` }}
      >
        {combinedNews}
      </div>
      <div
        className="inline-block"
        style={{ transform: `translateX(${position}%)` }}
      >
        {combinedNews}
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
