import { useState, useEffect } from "react";

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Delhi", "New Delhi", "Jammu & Kashmir", "Ladakh",
];

const KEY = "trippinity_user_state";
const EVENT = "trippinity_user_state_change";

export function useUserState() {
  const [userState, setUserState] = useState<string>(() => localStorage.getItem(KEY) ?? "");

  const saveState = (s: string) => {
    localStorage.setItem(KEY, s);
    setUserState(s);
    window.dispatchEvent(new CustomEvent(EVENT, { detail: s }));
  };

  // Keep every mounted instance of the hook in sync
  useEffect(() => {
    const onChange = (e: Event) => setUserState((e as CustomEvent<string>).detail ?? "");
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  useEffect(() => {
    if (localStorage.getItem(KEY)) return;
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const detected: string = data?.address?.state ?? "";
          const matched = INDIAN_STATES.find((s) => s.toLowerCase() === detected.toLowerCase());
          if (matched) saveState(matched);
        } catch {
          /* silently ignore */
        }
      },
      () => {
        /* silently ignore if denied */
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userState, setUserState: saveState, INDIAN_STATES };
}
