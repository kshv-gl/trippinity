export interface Company {
  id: string;
  name: string;
  logo: string; 
  verified: boolean;
  about: string;
  rating: number;
  trips: number;
}

export const companies: Record<string, Company> = {
  "himalayan-trails": {
    id: "himalayan-trails",
    name: "Himalayan Trails Co.",
    logo: "🏔️",
    verified: true,
    about: "Specialists in Himalayan adventures since 2016. 1,200+ travelers hosted across Manali, Spiti & Ladakh.",
    rating: 4.8,
    trips: 24,
  },
  "coastal-escapes": {
    id: "coastal-escapes",
    name: "Coastal Escapes",
    logo: "🌴",
    verified: true,
    about: "Beach and coastal experiences across Goa, Andaman, and Kerala. Curated by locals, loved by travelers.",
    rating: 4.7,
    trips: 18,
  },
  "kerala-trails": {
    id: "kerala-trails",
    name: "Kerala Trails",
    logo: "🛶",
    verified: true,
    about: "Backwater & hill-country journeys, hand-built by Kerala natives.",
    rating: 4.9,
    trips: 12,
  },
  "royal-rajasthan": {
    id: "royal-rajasthan",
    name: "Royal Rajasthan Tours",
    logo: "🏰",
    verified: true,
    about: "Heritage and palace experiences across Rajasthan with vetted local guides.",
    rating: 4.7,
    trips: 15,
  },
  "ride-india": {
    id: "ride-india",
    name: "Ride India Expeditions",
    logo: "🏍️",
    verified: true,
    about: "Motorcycle expeditions across Ladakh, Spiti & the North-East. Safety-first, story-rich.",
    rating: 4.9,
    trips: 9,
  },
};

export interface Trip {
  id: string;
  title: string;
  price: number;
  duration: string;
  dates: string;
  itinerary: string[];
  image: string;
  videoUrl?: string; // Optional. MUST be a travel-related video. Omit to fall back to image.
  plannerName: string;
  plannerAbout: string;
  companyId: string;
  rating: number;
  booked: number;
  popular: boolean;
  location: string;
  destination: string; // short tag e.g. "Himachal"
}

// Curated, verified TRAVEL-ONLY stock videos from Pexels CDN.
// Each one has been hand-picked for its category. If a video ever fails to
// load, the UI will gracefully fall back to the trip image (see TripCard).
// DO NOT add unrelated content (space, abstract, tech, etc.) here.
const VID = {
  // Mountains / Himalayas — drone over snowy peaks
  mountains: "https://videos.pexels.com/video-files/31476513/13421170_3840_2160_60fps.mp4",
  // Tropical beach — palms + turquoise water
  beach: "https://videos.pexels.com/video-files/34590035/14659202_1920_1080_30fps.mp4",
  // Kerala-style backwaters / tropical river
  backwaters: "https://videos.pexels.com/video-files/34742689/14728150_3840_2160_30fps.mp4",
  // Desert dunes — sand & dunes
  desert: "https://videos.pexels.com/video-files/33911366/14391353_3840_2160_24fps.mp4",
  // Island aerial — sea & coastline
  islands: "https://videos.pexels.com/video-files/20235510/20235510-uhd_3840_2160_30fps.mp4",
  // Mountain road — winding scenic road (good stand-in for Ladakh ride)
  bike: "https://videos.pexels.com/video-files/32659156/13924425_1920_1080_30fps.mp4"
};

export const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Magical Manali & Solang Valley",
    price: 12999,
    duration: "4N / 5D",
    dates: "Apr 15 – Apr 19, 2026",
    itinerary: [
      "Arrive in Manali, check-in, explore Mall Road & local cafes.",
      "Visit Solang Valley – paragliding, zorbing, and snow activities.",
      "Trek to Jogini Waterfall, visit Vashisht Temple & hot springs.",
      "Day trip to Rohtang Pass (subject to permits), scenic views.",
      "Visit Hadimba Temple, souvenir shopping, departure.",
    ],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80",
    videoUrl: VID.mountains,
    plannerName: "Arjun Mehta",
    plannerAbout: "Adventure travel specialist with 8+ years of curating Himalayan experiences.",
    companyId: "himalayan-trails",
    rating: 4.8,
    booked: 47,
    popular: true,
    location: "Manali, Himachal Pradesh",
    destination: "Himachal",
  },
  {
    id: "2",
    title: "Goa Beach Bliss Getaway",
    price: 8499,
    duration: "3N / 4D",
    dates: "May 1 – May 4, 2026",
    itinerary: [
      "Arrive in Goa, check-in at beach resort, sunset at Calangute.",
      "North Goa tour – Aguada Fort, Baga Beach, Anjuna Flea Market.",
      "South Goa exploration – Palolem Beach, boat ride, seafood dinner.",
      "Water sports at Baina Beach, departure.",
    ],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80",
    videoUrl: VID.beach,
    plannerName: "Priya Sharma",
    plannerAbout: "Beach & culture enthusiast crafting relaxing coastal experiences since 2019.",
    companyId: "coastal-escapes",
    rating: 4.6,
    booked: 32,
    popular: true,
    location: "Goa",
    destination: "Goa",
  },
  {
    id: "3",
    title: "Serene Kerala Backwaters",
    price: 15999,
    duration: "5N / 6D",
    dates: "Jun 10 – Jun 15, 2026",
    itinerary: [
      "Arrive in Kochi, Fort Kochi walk, Chinese fishing nets.",
      "Drive to Munnar – tea plantation visit, Mattupetty Dam.",
      "Munnar sightseeing – Eravikulam Park, Top Station.",
      "Drive to Alleppey, board houseboat, backwater cruise.",
      "Kovalam Beach, lighthouse visit, Ayurvedic spa.",
      "Trivandrum city tour, departure.",
    ],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80",
    videoUrl: VID.backwaters,
    plannerName: "Deepak Nair",
    plannerAbout: "Kerala native with deep knowledge of backwater routes and hidden gems.",
    companyId: "kerala-trails",
    rating: 4.9,
    booked: 63,
    popular: true,
    location: "Kerala",
    destination: "Kerala",
  },
  {
    id: "4",
    title: "Rajasthan Royal Heritage Tour",
    price: 18500,
    duration: "6N / 7D",
    dates: "Oct 5 – Oct 11, 2026",
    itinerary: [
      "Arrive Jaipur – Hawa Mahal, City Palace.",
      "Amber Fort, Nahargarh Fort, local bazaar.",
      "Drive to Jodhpur – Mehrangarh Fort, blue city walk.",
      "Jodhpur to Jaisalmer – Sam Sand Dunes, camel safari.",
      "Desert camping under the stars, folk music evening.",
      "Jaisalmer Fort, Patwon ki Haveli.",
      "Return to Jaipur, departure.",
    ],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=1200&q=80",
    videoUrl: VID.desert,
    plannerName: "Riya Patel",
    plannerAbout: "Heritage travel expert specializing in Rajasthan's royal experiences.",
    companyId: "royal-rajasthan",
    rating: 4.7,
    booked: 28,
    popular: false,
    location: "Rajasthan",
    destination: "Rajasthan",
  },
  {
    id: "5",
    title: "Andaman Island Adventure",
    price: 22000,
    duration: "5N / 6D",
    dates: "Nov 20 – Nov 25, 2026",
    itinerary: [
      "Arrive Port Blair, Cellular Jail visit, light & sound show.",
      "Ferry to Havelock Island, Radhanagar Beach sunset.",
      "Scuba diving at Elephant Beach, snorkeling.",
      "Neil Island – Laxmanpur Beach, natural rock formations.",
      "Glass-bottom boat ride, mangrove kayaking.",
      "Return to Port Blair, shopping, departure.",
    ],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    videoUrl: VID.islands,
    plannerName: "Priya Sharma",
    plannerAbout: "Beach & culture enthusiast crafting relaxing coastal experiences since 2019.",
    companyId: "coastal-escapes",
    rating: 4.5,
    booked: 19,
    popular: false,
    location: "Andaman Islands",
    destination: "Andaman",
  },
  {
    id: "6",
    title: "Leh Ladakh Bike Expedition",
    price: 25999,
    duration: "7N / 8D",
    dates: "Jul 1 – Jul 8, 2026",
    itinerary: [
      "Arrive Leh, acclimatization, Shanti Stupa visit.",
      "Leh sightseeing – Leh Palace, local monasteries.",
      "Ride to Nubra Valley via Khardung La.",
      "Nubra Valley – Diskit Monastery, double-hump camel ride.",
      "Ride to Pangong Lake, lakeside camping.",
      "Pangong to Leh via Chang La.",
      "Magnetic Hill, Confluence point, local market.",
      "Departure from Leh.",
    ],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80",
    videoUrl: VID.bike,
    plannerName: "Vikram Singh",
    plannerAbout: "Motorcycle touring expert with 50+ Ladakh expeditions under his belt.",
    companyId: "ride-india",
    rating: 4.9,
    booked: 85,
    popular: true,
    location: "Leh, Ladakh",
    destination: "Ladakh",
  },
];

export const destinations = [
  { name: "Himachal", emoji: "🏔️", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600&q=80" },
  { name: "Goa", emoji: "🌴", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80" },
  { name: "Kerala", emoji: "🛶", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80" },
  { name: "Rajasthan", emoji: "🏰", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80" },
  { name: "Andaman", emoji: "🏝️", image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80" },
  { name: "Ladakh", emoji: "🏍️", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80" },
];

// Hero: friends/group travel walking together — verified travel content.
export const HERO_VIDEO = "https://videos.pexels.com/video-files/5329316/5329316-uhd_4096_2160_25fps.mp4";
export const HERO_POSTER = "https://images.pexels.com/photos/5329538/pexels-photo-5329538.jpeg?cs=srgb&dl=pexels-cottonbro-5329538.jpg&fm=jpg&_gl=1*16fcv6z*_ga*MTUzNzUzNzM5Ny4xNzc1NDg5NzU1*_ga_8JE65Q40S6*czE3NzY4NTIwMDkkbzQkZzEkdDE3NzY4NTQxOTkkajU0JGwwJGgw";

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  tripId: string;
  date: string;
  peopleCount: number;
}
