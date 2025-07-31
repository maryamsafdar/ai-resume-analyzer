// components/ResumeSummary.tsx
"use client";

interface Props {
  summary: string;
  suggestions: string;
  job_titles: string;
}

export default function ResumeSummary({ summary, suggestions, job_titles }: Props) {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-white/80 border-l-4 border-purple-600 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-purple-800 mb-2">📝 Summary</h2>
        <p className="text-gray-700">{summary}</p>
      </div>

      <div className="bg-white/80 border-l-4 border-blue-500 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-blue-800 mb-2">🔧 Suggestions</h2>
        <p className="text-gray-700">{suggestions}</p>
      </div>

      <div className="bg-white/80 border-l-4 border-green-500 p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-green-800 mb-2">🎯 Job Recommendations</h2>
        <p className="text-gray-700">{job_titles}</p>
      </div>
    </div>
  );
}
