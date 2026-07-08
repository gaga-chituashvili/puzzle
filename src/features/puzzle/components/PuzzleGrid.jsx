import React from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import { usePuzzleGame } from "../hooks/usePuzzleGame";
import Tile from "./Tile";
import ImageUploader from "./ImageUploader";
import PuzzleControls from "./PuzzleControls";

export default function PuzzleGrid() {
  const {
    tiles,
    seconds,
    completed,
    droppedId,
    image,
    showImage,
    sensors,
    setShowImage,
    handleUpload,
    restartPuzzle,
    onDragEnd,
  } = usePuzzleGame();

  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center py-10">
      <h2 className="text-3xl text-[#F9EFEC] tracking-[0.2em] uppercase mb-6">
        Puzzle Game
      </h2>

      <ImageUploader hasImage={!!image} onUpload={handleUpload} />

      {image && (
        <PuzzleControls
          showImage={showImage}
          onToggleImage={() => setShowImage((prev) => !prev)}
          onRestart={restartPuzzle}
        />
      )}

      {image && completed && (
        <p className="text-green-400 text-xl font-bold mb-4">
          Completed in {seconds} seconds!
        </p>
      )}

      {image && (
        <div
          className={`flex flex-col lg:flex-row items-center gap-20 transition-all duration-500 ${
            showImage ? "lg:ml-10" : "lg:ml-0"
          }`}
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
          >
            <SortableContext
              items={tiles.map((t) => t.id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-3 gap-4">
                {tiles.map((t) => (
                  <Tile
                    key={t.id}
                    id={t.id}
                    pos={t.pos}
                    completed={completed}
                    droppedId={droppedId}
                    image={image}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          {showImage && (
            <div className="w-[450px] h-[450px] overflow-hidden rounded-2xl border border-[#1f1f1f] shadow-lg">
              <img
                src={image}
                alt="Puzzle Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      )}

      {image && <p className="text-[#e59874] mt-6 text-xl">Time: {seconds}s</p>}
    </section>
  );
}
