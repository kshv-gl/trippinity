import { useEffect, useState, useCallback } from "react";

const KEY = "trippinity:hasBooked";

const read = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(KEY) === "1";
};

export const useBookingState = () => {
  const [hasBooked, setHasBooked] = useState<boolean>(read);

  useEffect(() => {
    const onChange = () => setHasBooked(read());
    window.addEventListener("storage", onChange);
    window.addEventListener("trippinity:booking-changed", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("trippinity:booking-changed", onChange);
    };
  }, []);

  const setBooked = useCallback((value: boolean) => {
    if (value) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
    setHasBooked(value);
    window.dispatchEvent(new Event("trippinity:booking-changed"));
  }, []);

  return { hasBooked, setBooked };
};
