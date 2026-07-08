import React from "react";

export default function PuzzleControls({
  showImage,
  onToggleImage,
  onRestart,
}) {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={onToggleImage}
        className="px-6 py-2 bg-[#e59874] text-black rounded-xl font-bold hover:bg-[#f5b18e] transition"
      >
        {showImage ? "Hide Image" : "Show Image"}
      </button>

      <button
        onClick={onRestart}
        className="px-6 py-2 bg-[#e59874] text-black rounded-xl font-bold hover:bg-[#f5b18e] transition"
      >
        Shuffle Again
      </button>
    </div>
  );
}
