import { useState, useEffect } from "react";

const STORAGE_KEY = "compareIds";

export const useCompare = () => {
  const [compareIds, setCompareIds] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compareIds));
  }, [compareIds]);

  const toggle = (id: string) => {
    setCompareIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : prev.length < 3
        ? [...prev, id]
        : prev
    );
  };

  const clear = () => setCompareIds([]);
  const isSelected = (id: string) => compareIds.includes(id);

  return { compareIds, toggle, clear, isSelected };
};
