export interface Review {
  id: string;
  tripId: string; // matches mockTrips id
  user: string;
  avatar: string; // unsplash portrait
  city: string;
  rating: number;
  date: string;
  text: string;
  tripTitle: string;
}

export const reviews: Review[] = [
  {
    id: "r1",
    tripId: "1",
    user: "Aanya Kapoor",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    city: "Mumbai",
    rating: 5,
    date: "Mar 2026",
    text: "Honestly the smoothest trip I've ever booked. Solang Valley was magical and our planner Arjun was on top of every detail. The Trip Hub group chat made meeting strangers feel like meeting old friends.",
    tripTitle: "Magical Manali & Solang Valley",
  },
  {
    id: "r2",
    tripId: "3",
    user: "Rohan Verma",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    city: "Bengaluru",
    rating: 5,
    date: "Feb 2026",
    text: "Houseboat night in Alleppey was unreal. Pricing was crystal clear up front — no hidden charges, no awkward DMs. Trippinity is what travel booking should be.",
    tripTitle: "Serene Kerala Backwaters",
  },
  {
    id: "r3",
    tripId: "6",
    user: "Ishita Roy",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    city: "Kolkata",
    rating: 5,
    date: "Jan 2026",
    text: "Pangong Lake at sunrise — bucket list moment. Vikram led the bike convoy like a pro. Loved that I could chat the whole group before we even met.",
    tripTitle: "Leh Ladakh Bike Expedition",
  },
  {
    id: "r4",
    tripId: "2",
    user: "Karan Singh",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    city: "Delhi",
    rating: 4,
    date: "Dec 2025",
    text: "Great Goa weekend with the squad. The 25% upfront booking made commitment easy and the planner handled everything from airport pickup to the beach club entries.",
    tripTitle: "Goa Beach Bliss Getaway",
  },
  {
    id: "r5",
    tripId: "4",
    user: "Meera Iyer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    city: "Chennai",
    rating: 5,
    date: "Nov 2025",
    text: "Rajasthan felt like time travel. The desert camp under the stars was unreal. Loved the verified planner badge — I felt safe the whole way.",
    tripTitle: "Rajasthan Royal Heritage Tour",
  },
  {
    id: "r6",
    tripId: "5",
    user: "Aditya Rao",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    city: "Hyderabad",
    rating: 5,
    date: "Oct 2025",
    text: "Andaman scuba was a personal first. The trip docs PDF in the Trip Hub had every voucher I needed. Will book again — already eyeing Ladakh.",
    tripTitle: "Andaman Island Adventure",
  },
];

export const getReviewsForTrip = (tripId: string) => reviews.filter((r) => r.tripId === tripId);

// Standard inclusions/exclusions used across trips. Could be per-trip later.
export const STANDARD_INCLUSIONS = [
  { label: "Hand-picked stays (3★/4★)", icon: "bed" },
  { label: "All inter-city transport", icon: "bus" },
  { label: "Daily breakfast & 2 dinners", icon: "utensils" },
  { label: "Local sightseeing & guides", icon: "map" },
  { label: "Verified trip leader", icon: "shield" },
  { label: "24×7 in-app planner support", icon: "phone" },
];

export const STANDARD_EXCLUSIONS = [
  { label: "Flights / train tickets", icon: "plane" },
  { label: "Personal expenses & shopping", icon: "wallet" },
  { label: "Optional adventure activities", icon: "mountain" },
  { label: "Travel insurance", icon: "umbrella" },
];
