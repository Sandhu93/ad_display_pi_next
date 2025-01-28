"use client";

import { useState, useEffect } from "react";
import Clock from "./components/Clock";
import { VideoSection, ImageSlideshow } from "./components/MediaSections";
import StockTicker from "./components/StockTicker";
import { NewsTickerContainer } from "./components/NewsTicker";
import AutoScroll from "./components/AutoScroll";
import StatsGrid from "./components/StatsGrid";
import type { DisplayContent } from "./types";

const defaultContent: DisplayContent = {
  stats: {
    total_students: 0,
    total_faculty: 0,
    labs_available: 0,
    ongoing_projects: 0,
    research_publications: 0,
  },
  news: [],
  achievements: [],
  tickerText: "",
  mediaContent: {
    images: [
      "/media/photos/image1.jpg",
      "/media/photos/image2.jpg",
      "/media/photos/image3.jpg",
    ],
    videoUrl: "/media/video/sample.mp4",
  },
};

export default function Display() {
  const [content, setContent] = useState<DisplayContent>(defaultContent);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();
        setContent(data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
    const interval = setInterval(fetchContent, 30000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Header */}
      <header className="h-[7vh] bg-gray-800 px-4">
        <div className="h-full flex justify-between items-center">
          <h1 className="text-2xl font-bold">Research Lab Display</h1>
          <Clock />
        </div>
      </header>

      {/* Main Content */}
      <main className="h-[88vh] flex portrait:flex-col landscape:flex-row gap-2 p-2">
        {/* Left Section */}
        <div className="landscape:w-3/4 portrait:h-[50vh] flex flex-col gap-2">
          {/* Stats Section */}
          {/* Stats Section */}
          <div className="h-[20vh]">
            <StatsGrid stats={content.stats} />
          </div>

          {/* Media Section */}
          {/* Media Section */}
          <div className="flex-1 grid portrait:grid-rows-2 landscape:grid-cols-2 gap-2">
            <div className="bg-gray-800 rounded-lg overflow-hidden portrait:max-h-[18vh] portrait:max-w-[90vw] landscape:max-h-[50vh] landscape:max-w-[50vw] flex items-center justify-center">
              <VideoSection videoUrl={content.mediaContent.videoUrl} />
            </div>
            <div className="bg-gray-800 rounded-lg overflow-hidden portrait:max-h-[18vh] portrait:max-w-[90vw] landscape:max-h-[50vh] landscape:max-w-[50vw] flex items-center justify-center">
              <ImageSlideshow images={content.mediaContent.images} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="landscape:w-1/4 portrait:h-[38vh] flex flex-col gap-2">
          {/* Market Watch */}
          <div className="landscape:h-[20vh] portrait:h-1/4 bg-gray-800 p-2 rounded-lg">
            <h2 className="text-lg font-bold">Market Watch</h2>
            <StockTicker />
          </div>

          {/* News Section */}
          <div className="landscape:h-[34vh] portrait:h-[38%] bg-gray-800 p-2 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Latest News</h2>
            <AutoScroll
              items={content.news}
              speed={50}
              className="h-[calc(100%-2rem)]"
            />
          </div>

          {/* Achievements Section */}
          <div className="landscape:h-[34vh] portrait:h-[38%] bg-gray-800 p-2 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Achievements</h2>
            <AutoScroll
              items={content.achievements}
              speed={50}
              className="h-[calc(100%-2rem)]"
            />
          </div>
        </div>
      </main>

      {/* News Ticker */}
      <footer className="h-[5vh] bg-blue-600">
        <NewsTickerContainer headlines={content.news} />
      </footer>
    </div>
  );
}
