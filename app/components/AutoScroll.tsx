"use client";

import { useEffect, useRef } from "react";

interface AutoScrollProps {
  items: string[];
  speed?: number;
  className?: string;
  itemClassName?: string;
}

export default function AutoScroll({
  items,
  speed = 30,
  className = "",
  itemClassName = "",
}: AutoScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scroll = () => {
      if (
        scrollContainer.scrollTop + scrollContainer.clientHeight >=
        scrollContainer.scrollHeight
      ) {
        scrollContainer.scrollTop = 0;
      } else {
        scrollContainer.scrollTop += 1;
      }
    };

    const interval = setInterval(scroll, speed);
    return () => clearInterval(interval);
  }, [speed, items]);

  return (
    <div ref={scrollRef} className={`h-full overflow-hidden ${className}`}>
      <div className="space-y-2">
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className={`bg-gray-700 p-2 rounded-lg text-sm sm:text-base md:text-lg ${itemClassName}`}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
