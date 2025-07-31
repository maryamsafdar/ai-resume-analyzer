// components/UploadBox.tsx
"use client";

import { useRef } from "react";

export default function UploadBox({ onUpload }: { onUpload: (file: File) => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <div className="border-2 border-dashed border-purple-400 p-8 rounded-xl bg-white/70 shadow-md text-center">
      <p className="text-lg mb-3 text-gray-700">📄 Upload your PDF resume</p>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        ref={fileRef}
        className="hidden"
      />
      <button
        className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700 transition"
        onClick={() => fileRef.current?.click()}
      >
        Choose File
      </button>
    </div>
  );
}
