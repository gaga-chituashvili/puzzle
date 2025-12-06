import React, { useState, useEffect } from "react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";

const positions = [
  "0% 0%",
  "50% 0%",
  "100% 0%",
  "0% 50%",
  "50% 50%",
  "100% 50%",
  "0% 100%",
  "50% 100%",
  "100% 100%",
];

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

function Tile({ id, pos, completed, image, droppedId }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled: {
        transform: true,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: 150,
    height: 150,
    backgroundImage: `url(${image})`,
    backgroundSize: "300% 300%",
    backgroundPosition: pos,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`rounded-xl border border-[#262626] bg-cover 
        ${completed ? "opacity-70" : "cursor-move"} 
        ${droppedId === id ? "tile-bounce" : ""}`}
    />
  );
}

export default function PuzzleGrid() {
  const initialTiles = positions.map((pos, i) => ({ id: i + 1, pos }));

  const [tiles, setTiles] = useState(shuffle(initialTiles));
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [droppedId, setDroppedId] = useState(null);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setImage(url);
    restartPuzzle();
  };

  const restartPuzzle = () => {
    setTiles(shuffle(initialTiles));
    setSeconds(0);
    setCompleted(false);
    setShowImage(false); // hide image on shuffle
  };

  useEffect(() => {
    if (completed) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [completed]);

  useEffect(() => {
    if (!image) return;
    const solved = tiles.every((t, i) => t.id === i + 1);
    if (solved) setCompleted(true);
  }, [tiles, image]);

  const onDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setDroppedId(active.id);
      const oldIndex = tiles.findIndex((t) => t.id === active.id);
      const newIndex = tiles.findIndex((t) => t.id === over.id);

      const newTiles = [...tiles];
      const temp = newTiles[oldIndex];
      newTiles[oldIndex] = newTiles[newIndex];
      newTiles[newIndex] = temp;

      setTiles(newTiles);
      setTimeout(() => setDroppedId(null), 300);
    }
  };

  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center py-10">
      <h2 className="text-3xl text-[#F9EFEC] tracking-[0.2em] uppercase mb-6">
        Puzzle Game
      </h2>

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
          onChange={handleUpload}
          className="hidden"
        />

        {!image && (
          <p className="text-gray-500 mt-3 text-sm">
            Upload any image to begin the puzzle
          </p>
        )}
      </div>

      {image && (
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setShowImage((prev) => !prev)}
            className="px-6 py-2 bg-[#e59874] text-black rounded-xl font-bold hover:bg-[#f5b18e] transition"
          >
            {showImage ? "Hide Image" : "Show Image"}
          </button>

          <button
            onClick={restartPuzzle}
            className="px-6 py-2 bg-[#e59874] text-black rounded-xl font-bold hover:bg-[#f5b18e] transition"
          >
            Shuffle Again
          </button>
        </div>
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
