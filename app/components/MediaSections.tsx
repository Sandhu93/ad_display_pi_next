"use client";
import Image from 'next/image';

import { useState, useEffect } from "react";

export function VideoSection({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="h-full">
      <video
        className="w-full h-full rounded-lg object-contain"
 className="w-full h-full rounded-lg object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export function ImageSlideshow({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative h-full">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        width={1920} // Or a suitable base width
        height={1080} // Or a suitable base height
 className="w-full h-full rounded-lg object-cover"
      />
    </div>
  );
}
