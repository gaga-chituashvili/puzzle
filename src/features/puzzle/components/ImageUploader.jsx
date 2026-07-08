import React from "react";

export default function ImageUploader({ hasImage, onUpload }) {
  return (
    <div className="mb-6 flex flex-col items-center">
      <label
        htmlFor="fileUpload"
        className="cursor-pointer bg-[#151515]/50 border border-[#2a2a2a]
          hover:border-[#e59874] hover:bg-[#1f1f1f] transition-all
          text-[#e8e8e8] px-8 py-4 rounded-xl text-lg font-semibold
          flex items-center gap-3 shadow-lg backdrop-blur-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-7 h-7 text-[#e59874]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25
               2.25 0 0021 18.75V16.5m-9-12v12m0 0l3.75-3.75M12
               16.5l-3.75-3.75"
          />
        </svg>
        Upload Image
      </label>

      <input
        type="file"
        id="fileUpload"
        accept="image/*"
        onChange={onUpload}
        className="hidden"
      />

      {!hasImage && (
        <p className="text-gray-500 mt-3 text-sm">
          Upload any image to begin the puzzle
        </p>
      )}
    </div>
  );
}
