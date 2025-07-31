// frontend/pages/index.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import UploadBox from "./frontend/components/UploadBox";
import ResumeSummary from "./frontend/components/ResumeSummary";


interface ResumeResult {
  summary: string;
  suggestions: string;
  job_titles: string;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResumeResult | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async (file: File) => {
    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("❌ Failed to analyze resume. Try another file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-blue-100 p-8">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">📄 Resume Analyzer</h1>

        <UploadBox onUpload={handleUpload} />

        {loading && <p className="mt-6 text-center text-blue-600 font-medium">Analyzing resume...</p>}

        {error && <p className="mt-6 text-center text-red-500 font-medium">{error}</p>}

        {result && <ResumeSummary {...result} />}
      </div>
    </main>
  );
}
