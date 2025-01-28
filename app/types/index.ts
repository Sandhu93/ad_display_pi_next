export interface Stats {
  [key: string]: string | number;
}

export interface MediaContent {
  images: string[];
  videoUrl: string;
}

export interface DisplayContent {
  stats: LabStats;
  news: string[];
  achievements: string[];
  tickerText: string;
  mediaContent: MediaContent;
}
