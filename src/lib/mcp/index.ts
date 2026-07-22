import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchTripsTool from "./tools/search-trips";
import getTripDetailsTool from "./tools/get-trip-details";
import listDestinationsTool from "./tools/list-destinations";
import listPlannersTool from "./tools/list-planners";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "trippinity-mcp",
  title: "Trippinity",
  version: "0.1.0",
  instructions:
    "Tools for Trippinity — a curated travel marketplace. Use `search_trips` to find trips by destination/budget/rating, `get_trip_details` to fetch full itinerary + planner info, `list_destinations` to see what's covered, and `list_planners` to browse verified operators.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchTripsTool, getTripDetailsTool, listDestinationsTool, listPlannersTool],
});
