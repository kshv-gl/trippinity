import { useState } from "react";

export const useCompare = () => {
  const [compareIds, setCompareIds] = useState<string[]>([]);

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
