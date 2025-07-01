"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";
import type { DisplayContent } from "../types";

export default function Admin() {
  const [content, setContent] = useState<DisplayContent>({
    stats: { 
      total_students: 0, 
      total_faculty: 0, 
      labs_available: 0, 
      ongoing_projects: 0, 
      "placements 2025": "0" 
    },
    // Ensure all properties from DisplayContent are initialized
    news: [],
    achievements: [],
    tickerText: [],
    footerText: [],
    mediaContent: {
      images: [],
      videoUrl: "",
    },
    Departments: [],
    major_recruiters: [],
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
          <div className="space-y-4">
            {Object.entries(content.stats).map(([key, value], index) => (
              <div key={key} className="flex gap-2">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Label
                    </label>
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => {
                        const newStats = { ...content.stats };
                        const oldValue = newStats[key];
                        delete newStats[key];
                        newStats[e.target.value] = oldValue;
                        setContent({ ...content, stats: newStats });
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Statistic name (e.g., total_students)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Value
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setContent({
                          ...content,
                          stats: {
                            ...content.stats,
                            [key]: e.target.value,
                          },
                        });
                      }}
                      className="w-full p-2 border rounded"
                      placeholder="Value (number or text)"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newStats = { ...content.stats };
                    delete newStats[key];
                    setContent({ ...content, stats: newStats });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                const newKey = `new_stat_${Object.keys(content.stats).length + 1}`;
                setContent({
                  ...content,
                  stats: {
                    ...content.stats,
                    [newKey]: 0,
                  },
                });
              }}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add New Statistic
            </button>
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

        {/* Welcome Message */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Welcome Message (Main Display)</h2>
          <p className="text-sm text-gray-600 mb-4">This text appears next to "WELCOME" in the main display area.</p>
          <div className="space-y-4">
            {content.tickerText.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newTickerText = [...content.tickerText];
                    newTickerText[index] = e.target.value;
                    setContent({ ...content, tickerText: newTickerText });
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => {
                    const newTickerText = content.tickerText.filter((_, i) => i !== index);
                    setContent({ ...content, tickerText: newTickerText });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setContent({ ...content, tickerText: [...content.tickerText, ""] })}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add Ticker Item
            </button>
          </div>
        </section>

        {/* Footer Ticker */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Footer Ticker</h2>
          <p className="text-sm text-gray-600 mb-4">This text appears in the scrolling footer at the bottom of the display.</p>
          <div className="space-y-4">
            {content.footerText?.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => {
                    const newFooterText = [...(content.footerText || [])];
                    newFooterText[index] = e.target.value;
                    setContent({ ...content, footerText: newFooterText });
                  }}
                  className="flex-1 p-2 border rounded"
                  placeholder="Footer ticker item"
                />
                <button
                  onClick={() => {
                    const newFooterText = (content.footerText || []).filter((_, i) => i !== index);
                    setContent({ ...content, footerText: newFooterText });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setContent({ ...content, footerText: [...(content.footerText || []), ""] })}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add Footer Item
            </button>
          </div>
        </section>

        {/* Media Content Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Media Content</h2>

          {/* Video Upload */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Current Video URL:</label>
            <p className="break-all">{content.mediaContent.videoUrl}</p>
            <input
              type="file"
              accept="video/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const formData = new FormData();
                  formData.append('file', file);

                  try {
                    const res = await fetch('/api/upload', {
                      method: 'POST',
                      body: formData,
                    });
                    const data = await res.json();
                    if (data.status === 'succeeded') {
                      setContent({
                        ...content,
                        mediaContent: { ...content.mediaContent, videoUrl: data.path },
                      });
                      alert('Video uploaded successfully!');
                    } else {
                      alert('Video upload failed.');
                    }
                  } catch (error) {
                    console.error('Error uploading video:', error);
                    alert('Error uploading video.');
                  }
                }
              }}
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          {/* Image List and Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">Images:</label>
            <div className="space-y-2">
              {content.mediaContent.images.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 break-all">{image}</span>
                  <button
                    onClick={() => {
                      const newImages = content.mediaContent.images.filter((_, i) => i !== index);
                      setContent({ ...content, mediaContent: { ...content.mediaContent, images: newImages } });
                    }}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <input type="file" accept="image/*" multiple onChange={async (e) => {
                const files = e.target.files;
                console.log('Selected files:', files);
                if (files) {
                  const uploadedImagePaths: string[] = [];
                  for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const formData = new FormData();
                    formData.append('file', file);

                    try {
                      const res = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                      });
                      const data = await res.json();
                      if (data.status === 'succeeded') {
                        console.log('Upload successful, data:', data);
                        uploadedImagePaths.push(data.path);
                      } else {
                        alert(`Image upload failed for ${file.name}.`);
                      }
                    } catch (error) {
                      console.error(`Error uploading image ${file.name}:`, error);
                      alert(`Error uploading image ${file.name}.`);
                    }
                  }
                  setContent({
                    ...content,
                    mediaContent: {
                      ...content.mediaContent,
                      images: [...content.mediaContent.images, ...uploadedImagePaths],
                    },
                  });
                  if (uploadedImagePaths.length > 0) {
                      alert(`${uploadedImagePaths.length} image(s) uploaded successfully!`);
                  }
                }
              }} className="w-full p-2 border rounded mt-2" />
          </div>
        </section>

        {/* Departments Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Departments</h2>
          <div className="space-y-4">
            {content.Departments.map((department, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={department}
                  onChange={(e) => {
                    const newDepartments = [...content.Departments];
                    newDepartments[index] = e.target.value;
                    setContent({ ...content, Departments: newDepartments });
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => {
                    const newDepartments = content.Departments.filter((_, i) => i !== index);
                    setContent({ ...content, Departments: newDepartments });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setContent({ ...content, Departments: [...content.Departments, ""] })}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add Department
            </button>
          </div>
        </section>

        {/* Major Recruiters Section */}
        <section className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold mb-4">Major Recruiters</h2>
          <div className="space-y-4">
            {content.major_recruiters.map((recruiter, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={recruiter}
                  onChange={(e) => {
                    const newRecruiters = [...content.major_recruiters];
                    newRecruiters[index] = e.target.value;
                    setContent({ ...content, major_recruiters: newRecruiters });
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => {
                    const newRecruiters = content.major_recruiters.filter((_, i) => i !== index);
                    setContent({ ...content, major_recruiters: newRecruiters });
                  }}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
            <button
              onClick={() => setContent({ ...content, major_recruiters: [...content.major_recruiters, ""] })}
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 p-2 rounded"
            >
              <Plus className="w-5 h-5" />
              Add Recruiter
            </button>
          </div>
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
