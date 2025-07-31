// pages/index.tsx
"use client";

import { useState } from "react";
import axios from "axios";
import UploadBox from "./frontend/components/UploadBox";
import ResumeSummary from "./frontend/components/ResumeSummary";


export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post("http://localhost:8000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setData(res.data);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200 py-16 px-4">
      <div className="max-w-4xl mx-auto glass-container p-10 rounded-3xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-purple-800 mb-10">
          🧠 AI Resume Analyzer
        </h1>

        <UploadBox onUpload={handleUpload} />
        {loading && <p className="text-center mt-6">🔍 Analyzing your resume...</p>}
        {data && <ResumeSummary {...data} />}
      </div>

      <footer className="text-center mt-12 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} by Maryam Safdar
      </footer>
    </main>
  );
}
