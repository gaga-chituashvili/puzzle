import { useState, useEffect } from "react";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { POSITIONS } from "../constants/positions";
import { shuffle } from "../utils/shuffle";

const initialTiles = POSITIONS.map((pos, i) => ({ id: i + 1, pos }));

export function usePuzzleGame() {
  const [tiles, setTiles] = useState(shuffle(initialTiles));
  const [seconds, setSeconds] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [droppedId, setDroppedId] = useState(null);
  const [image, setImage] = useState(null);
  const [showImage, setShowImage] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const restartPuzzle = () => {
    setTiles(shuffle(initialTiles));
    setSeconds(0);
    setCompleted(false);
    setShowImage(false);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    restartPuzzle();
  };

  useEffect(() => {
    if (completed) return;
    const timer = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(timer);
  }, [completed]);

  useEffect(() => {
    if (!image) return;
    const solved = tiles.every((t, i) => t.id === i + 1);
    if (solved) setCompleted(true);
  }, [tiles, image]);

  const onDragEnd = ({ active, over }) => {
    if (!over || active.id === over.id) return;

    setDroppedId(active.id);
    const oldIndex = tiles.findIndex((t) => t.id === active.id);
    const newIndex = tiles.findIndex((t) => t.id === over.id);

    const newTiles = [...tiles];
    [newTiles[oldIndex], newTiles[newIndex]] = [
      newTiles[newIndex],
      newTiles[oldIndex],
    ];

    setTiles(newTiles);
    setTimeout(() => setDroppedId(null), 300);
  };

  return {
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
  };
}
