"use client";
import Image from 'next/image';

import { useState, useEffect } from "react";

export function VideoSection({ videoUrl }: { videoUrl: string }) {
  return (
    <div className="w-full pb-[56.25%] relative">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
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
    <div className="w-full pb-[56.25%] relative">
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        width={1920} // Or a suitable base width
        height={1080} // Or a suitable base height
        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
      />
    </div>
  );
}
