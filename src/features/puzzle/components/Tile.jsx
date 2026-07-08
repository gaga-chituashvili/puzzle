import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Tile({ id, pos, completed, image, droppedId }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id, disabled: { transform: true } });

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
