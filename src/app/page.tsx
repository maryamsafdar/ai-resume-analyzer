"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [summary, setSummary] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [jobs, setJobs] = useState("");
  const [industry, setIndustry] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [cover, setCover] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData);
      setSummary(res.data.summary);
      setSuggestions(res.data.suggestions);
      setJobs(res.data.job_titles);
      setIndustry(res.data.industry);
      setKeywords(res.data.keywords);
      setTips(res.data.tips);
      setCover(res.data.cover_letter);
    } catch (err) {
      console.error("Upload failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-10 bg-gradient-to-br from-indigo-200 via-purple-100 to-pink-100 font-sans text-gray-800">
      <div className="max-w-3xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl p-10 shadow-2xl border border-purple-200 relative overflow-hidden">
        <h1 className="text-4xl font-bold text-center mb-6">✨ AI Resume Analyzer</h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="text-sm border p-2 rounded-md w-full sm:w-auto"
          />
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {summary && (
          <div className="mt-8 space-y-5">
            <Section title="📝 Summary" content={summary} />
            <Section title="🔧 Suggestions" content={suggestions} />
            <Section title="🎯 Job Titles" content={jobs} />
            <Section title="🏢 Industry" content={industry} />
            <ListSection title="🧠 Missing Keywords" items={keywords} color="text-purple-700" />
            <ListSection title="💡 Resume Tips" items={tips} color="text-blue-700" />
            <Section title="📄 Cover Letter" content={cover} pre />
          </div>
        )}
      </div>
    </div>
  );
}

function Section({
  title,
  content,
  pre = false,
}: {
  title: string;
  content: string;
  pre?: boolean;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      {pre ? (
        <pre className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap shadow-inner">{content}</pre>
      ) : (
        <p className="mt-1">{content}</p>
      )}
    </div>
  );
}

function ListSection({
  title,
  items,
  color,
}: {
  title: string;
  items: string[];
  color?: string;
}) {
  return (
    <div>
      <h2 className="text-xl font-bold">{title}</h2>
      <ul className={`list-disc ml-6 space-y-1 mt-1 ${color || "text-gray-700"}`}>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
