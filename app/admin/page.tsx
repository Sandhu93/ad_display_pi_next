"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { DisplayContent } from "../types";

export default function Admin() {
  const [content, setContent] = useState<DisplayContent>({
    stats: { projects: 0, team: 0, publications: 0 },
    news: [],
    achievements: [],
    tickerText: "",
    mediaContent: {
      images: [],
      videoUrl: "",
    },
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });

      if (res.ok) {
        alert("Content saved successfully!");
      } else {
        throw new Error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Error saving content");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Display Board Admin</h1>

        {/* Stats Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Lab Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Active Projects
              </label>
              <input
                type="number"
                value={content.stats.projects}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stats: {
                      ...content.stats,
                      projects: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Team Members
              </label>
              <input
                type="number"
                value={content.stats.team}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stats: {
                      ...content.stats,
                      team: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Publications
              </label>
              <input
                type="number"
                value={content.stats.publications}
                onChange={(e) =>
                  setContent({
                    ...content,
                    stats: {
                      ...content.stats,
                      publications: parseInt(e.target.value) || 0,
                    },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </section>

        {/* News Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">News Items</h2>
          <div className="space-y-4">
            {content.news.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newNews = [...content.news];
                    newNews[index] = e.target.value;
                    setContent({ ...content, news: newNews });
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => {
                    const newNews = content.news.filter((_, i) => i !== index);
                    setContent({ ...content, news: newNews });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setContent({ ...content, news: [...content.news, ""] })
              }
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add News Item
            </button>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Achievements</h2>
          <div className="space-y-4">
            {content.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => {
                    const newAchievements = [...content.achievements];
                    newAchievements[index] = e.target.value;
                    setContent({ ...content, achievements: newAchievements });
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => {
                    const newAchievements = content.achievements.filter(
                      (_, i) => i !== index
                    );
                    setContent({ ...content, achievements: newAchievements });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setContent({
                  ...content,
                  achievements: [...content.achievements, ""],
                })
              }
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add Achievement
            </button>
          </div>
        </section>

        {/* Ticker Text */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Ticker Text</h2>
          <textarea
            value={content.tickerText}
            onChange={(e) =>
              setContent({ ...content, tickerText: e.target.value })
            }
            className="w-full p-2 border rounded h-24"
            placeholder="Enter ticker text (use • to separate items)"
          />
        </section>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
