import React from "react";

interface Props {
  summary: string;
  suggestions: string;
  job_titles: string;
}

export default function ResumeSummary({ summary, suggestions, job_titles }: Props) {
  return (
    <div className="mt-8 space-y-6 text-gray-700">
      <div>
        <h3 className="text-xl font-semibold text-purple-700">📝 Summary</h3>
        <p className="mt-2">{summary}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-blue-700">🔧 Suggestions</h3>
        <p className="mt-2">{suggestions}</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold text-green-700">🎯 Job Recommendations</h3>
        <p className="mt-2">{job_titles}</p>
      </div>
    </div>
  );
}
