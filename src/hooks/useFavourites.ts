import { useEffect, useState, useCallback } from "react";

const KEY = "trippinity:favourites";

const read = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
};

export const useFavourites = () => {
  const [favs, setFavs] = useState<string[]>(() => (typeof window === "undefined" ? [] : read()));

  useEffect(() => {
    const onStorage = () => setFavs(read());
    window.addEventListener("storage", onStorage);
    window.addEventListener("trippinity:fav-changed", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("trippinity:fav-changed", onStorage);
    };
  }, []);

  const toggle = useCallback((id: string) => {
    const current = read();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    localStorage.setItem(KEY, JSON.stringify(next));
    setFavs(next);
    window.dispatchEvent(new Event("trippinity:fav-changed"));
  }, []);

  const isFav = useCallback((id: string) => favs.includes(id), [favs]);

  return { favs, isFav, toggle };
};
