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

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="mb-4 text-white"
      />

      {image && (
        <button
          onClick={restartPuzzle}
          className="px-6 py-2 bg-[#e59874] text-black rounded-xl mb-6 font-bold hover:bg-[#f5b18e] transition"
        >
          Shuffle Again
        </button>
      )}

      {!image && <p className="text-gray-400">Upload image to start puzzle</p>}

      {image && completed && (
        <p className="text-green-400 text-xl font-bold mb-4">
          Completed in {seconds} seconds!
        </p>
      )}

      {image && (
        <div className="flex flex-col lg:flex-row items-center gap-20">
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

          <div className="w-[450px] h-[450px] overflow-hidden rounded-2xl border border-[#1f1f1f]">
            <img
              src={image}
              alt="Puzzle"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {image && <p className="text-[#e59874] mt-6 text-xl">Time: {seconds}s</p>}
    </section>
  );
}
