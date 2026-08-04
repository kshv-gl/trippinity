import { useCallback, useEffect, useState } from "react";

// Lightweight mock auth — persists a "logged in" user in localStorage so
// the navbar / Profile button can react globally. Real auth (Supabase) can
// be swapped in later without changing consumers.

const KEY = "trippinity:user";
const EVT = "trippinity:auth-changed";

export interface MockUser {
  name: string;
  email: string;
  dob?: string; // ISO string "YYYY-MM-DD"
}

export const getAgeFromDob = (dob?: string): number | null => {
  if (!dob) return null;
  const birth = new Date(dob);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

const read = (): MockUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as MockUser) : null;
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState<MockUser | null>(read);

  useEffect(() => {
    const onChange = () => setUser(read());
    window.addEventListener("storage", onChange);
    window.addEventListener(EVT, onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener(EVT, onChange);
    };
  }, []);

  const login = useCallback((u: MockUser) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    window.dispatchEvent(new Event(EVT));
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event(EVT));
    setUser(null);
  }, []);

  return { user, isAuthenticated: !!user, login, logout };
};
