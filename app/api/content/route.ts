import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import type { DisplayContent } from "@/app/types";

const contentFile = path.join(process.cwd(), "content.json");

const defaultContent: DisplayContent = {
  stats: { projects: 5, team: 9, publications: 12 },
  news: [
    "Welcome to our research lab display board",
    "New research paper published in Nature",
    "Lab awarded major research grant",
    "Upcoming conference presentation next month",
  ],
  achievements: [
    "Published 3 papers in top journals",
    "Successfully completed Phase 1 of major project",
    "Two team members awarded PhD",
    "Research featured in international media",
  ],
  tickerText:
    "Welcome to our research lab • New achievements • Ongoing projects • Latest publications",
  mediaContent: {
    images: [
      "/media/photos/image1.jpg",
      "/media/photos/image2.jpg",
      "/media/photos/image3.jpg",
    ],
    videoUrl: "/media/video/sample.mp4",
  },
};

async function initializeContent() {
  try {
    await fs.access(contentFile);
  } catch {
    await fs.writeFile(contentFile, JSON.stringify(defaultContent, null, 2));
  }
}

export async function GET() {
  try {
    await initializeContent();
    const content = await fs.readFile(contentFile, "utf-8");
    return NextResponse.json(JSON.parse(content));
  } catch (error) {
    console.error("Error reading content:", error);
    // Return default content if file read fails
    return NextResponse.json(defaultContent);
  }
}

export async function POST(request: Request) {
  try {
    const content = await request.json();
    await fs.writeFile(contentFile, JSON.stringify(content, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating content:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 }
    );
  }
}
