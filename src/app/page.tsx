// === FILE: frontend/pages/index.tsx ===
"use client";

import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ResumeSummary from "../components/ResumeSummary";

export default function Home() {
  const [result, setResult] = useState<null | {
    summary: string;
    suggestions: string;
    job_titles: string;
  }>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-purple-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          🧾 Smart Resume Analyzer
        </h1>

        <UploadBox onResult={setResult} />

        {result && <ResumeSummary {...result} />}
      </div>
    </main>
  );
}
