export interface Trip {
  id: string;
  title: string;
  price: number;
  duration: string;
  dates: string;
  itinerary: string[];
  image: string;
  plannerName: string;
  plannerAbout: string;
  rating: number;
  booked: number;
  popular: boolean;
  location: string;
}

export const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Magical Manali & Solang Valley",
    price: 12999,
    duration: "4 Nights / 5 Days",
    dates: "Apr 15 – Apr 19, 2026",
    itinerary: [
      "Day 1: Arrive in Manali, check-in, explore Mall Road & local cafes.",
      "Day 2: Visit Solang Valley – paragliding, zorbing, and snow activities.",
      "Day 3: Trek to Jogini Waterfall, visit Vashisht Temple & hot springs.",
      "Day 4: Day trip to Rohtang Pass (subject to permits), scenic views.",
      "Day 5: Visit Hadimba Temple, souvenir shopping, departure."
    ],
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80",
    plannerName: "Arjun Mehta",
    plannerAbout: "Adventure travel specialist with 8+ years of curating Himalayan experiences.",
    rating: 4.8,
    booked: 47,
    popular: true,
    location: "Manali, Himachal Pradesh"
  },
  {
    id: "2",
    title: "Goa Beach Bliss Getaway",
    price: 8499,
    duration: "3 Nights / 4 Days",
    dates: "May 1 – May 4, 2026",
    itinerary: [
      "Day 1: Arrive in Goa, check-in at beach resort, sunset at Calangute.",
      "Day 2: North Goa tour – Aguada Fort, Baga Beach, Anjuna Flea Market.",
      "Day 3: South Goa exploration – Palolem Beach, boat ride, seafood dinner.",
      "Day 4: Water sports at Baina Beach, departure."
    ],
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80",
    plannerName: "Priya Sharma",
    plannerAbout: "Beach & culture enthusiast crafting relaxing coastal experiences since 2019.",
    rating: 4.6,
    booked: 32,
    popular: true,
    location: "Goa"
  },
  {
    id: "3",
    title: "Serene Kerala Backwaters",
    price: 15999,
    duration: "5 Nights / 6 Days",
    dates: "Jun 10 – Jun 15, 2026",
    itinerary: [
      "Day 1: Arrive in Kochi, Fort Kochi walk, Chinese fishing nets.",
      "Day 2: Drive to Munnar – tea plantation visit, Mattupetty Dam.",
      "Day 3: Munnar sightseeing – Eravikulam Park, Top Station.",
      "Day 4: Drive to Alleppey, board houseboat, backwater cruise.",
      "Day 5: Kovalam Beach, lighthouse visit, Ayurvedic spa.",
      "Day 6: Trivandrum city tour, departure."
    ],
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    plannerName: "Deepak Nair",
    plannerAbout: "Kerala native with deep knowledge of backwater routes and hidden gems.",
    rating: 4.9,
    booked: 63,
    popular: true,
    location: "Kerala"
  },
  {
    id: "4",
    title: "Rajasthan Royal Heritage Tour",
    price: 18500,
    duration: "6 Nights / 7 Days",
    dates: "Oct 5 – Oct 11, 2026",
    itinerary: [
      "Day 1: Arrive Jaipur – Hawa Mahal, City Palace.",
      "Day 2: Amber Fort, Nahargarh Fort, local bazaar.",
      "Day 3: Drive to Jodhpur – Mehrangarh Fort, blue city walk.",
      "Day 4: Jodhpur to Jaisalmer – Sam Sand Dunes, camel safari.",
      "Day 5: Desert camping under the stars, folk music evening.",
      "Day 6: Jaisalmer Fort, Patwon ki Haveli.",
      "Day 7: Return to Jaipur, departure."
    ],
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    plannerName: "Riya Patel",
    plannerAbout: "Heritage travel expert specializing in Rajasthan's royal experiences.",
    rating: 4.7,
    booked: 28,
    popular: false,
    location: "Rajasthan"
  },
  {
    id: "5",
    title: "Andaman Island Adventure",
    price: 22000,
    duration: "5 Nights / 6 Days",
    dates: "Nov 20 – Nov 25, 2026",
    itinerary: [
      "Day 1: Arrive Port Blair, Cellular Jail visit, light & sound show.",
      "Day 2: Ferry to Havelock Island, Radhanagar Beach sunset.",
      "Day 3: Scuba diving at Elephant Beach, snorkeling.",
      "Day 4: Neil Island – Laxmanpur Beach, natural rock formations.",
      "Day 5: Glass-bottom boat ride, mangrove kayaking.",
      "Day 6: Return to Port Blair, shopping, departure."
    ],
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    plannerName: "Arjun Mehta",
    plannerAbout: "Adventure travel specialist with 8+ years of curating Himalayan experiences.",
    rating: 4.5,
    booked: 19,
    popular: false,
    location: "Andaman Islands"
  },
  {
    id: "6",
    title: "Leh Ladakh Bike Expedition",
    price: 25999,
    duration: "7 Nights / 8 Days",
    dates: "Jul 1 – Jul 8, 2026",
    itinerary: [
      "Day 1: Arrive Leh, acclimatization, Shanti Stupa visit.",
      "Day 2: Leh sightseeing – Leh Palace, local monasteries.",
      "Day 3: Ride to Nubra Valley via Khardung La.",
      "Day 4: Nubra Valley – Diskit Monastery, double-hump camel ride.",
      "Day 5: Ride to Pangong Lake, lakeside camping.",
      "Day 6: Pangong to Leh via Chang La.",
      "Day 7: Magnetic Hill, Confluence point, local market.",
      "Day 8: Departure from Leh."
    ],
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    plannerName: "Vikram Singh",
    plannerAbout: "Motorcycle touring expert with 50+ Ladakh expeditions under his belt.",
    rating: 4.9,
    booked: 85,
    popular: true,
    location: "Leh, Ladakh"
  },
];

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  tripId: string;
  date: string;
  peopleCount: number;
}
