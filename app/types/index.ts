export interface Stats {
  [key: string]: string | number;
}

export interface MediaContent {
  images: string[];
  videoUrl: string;
}

export interface DisplayContent {
  stats: {
    total_students: number;
    total_faculty: number;
    labs_available: number;
    ongoing_projects: number;
    [key: string]: number | string;
  };
  news: string[];
  achievements: string[];
  tickerText: string | string[];
  mediaContent: {
    images: string[];
    videoUrl: string;
  };
  Departments: string[]; // ✅ Add this line
  major_recruiters: string[]; // ✅ Add this line
}
