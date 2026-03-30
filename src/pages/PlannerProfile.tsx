import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import BottomNav from "@/components/BottomNav";
import TripCard from "@/components/TripCard";
import { mockTrips } from "@/data/mockTrips";

const PlannerProfile = () => {
  const { slug } = useParams();
  const plannerTrips = mockTrips.filter(
    (t) => t.plannerName.toLowerCase().replace(/\s+/g, "-") === slug
  );
  const planner = plannerTrips[0];

  if (!planner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Planner not found</h1>
          <Link to="/" className="text-primary hover:underline">Go back home</Link>
        </div>
      </div>
    );
  }

  const avgRating = (plannerTrips.reduce((sum, t) => sum + t.rating, 0) / plannerTrips.length).toFixed(1);

  return (
    <div className="min-h-screen pb-20 sm:pb-0">
      <Navbar />
      <div className="container max-w-3xl py-8">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Trips
        </Link>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold">
            {planner.plannerName[0]}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">{planner.plannerName}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Star className="w-4 h-4 fill-secondary stroke-secondary" />
              <span className="font-semibold text-foreground">{avgRating}</span>
              <span>· {plannerTrips.length} trips listed</span>
            </div>
          </div>
        </div>

        <div className="bg-muted rounded-2xl p-5 mb-8">
          <h2 className="font-semibold mb-2">About</h2>
          <p className="text-sm text-muted-foreground">{planner.plannerAbout}</p>
        </div>

        <h2 className="text-lg font-bold mb-4">Trips by {planner.plannerName}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plannerTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default PlannerProfile;
