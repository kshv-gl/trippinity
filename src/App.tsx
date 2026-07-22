import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import TripDetails from "./pages/TripDetails";
import PlannerProfile from "./pages/PlannerProfile";
import Explore from "./pages/Explore";
import Destinations from "./pages/Destinations";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import Favourites from "./pages/Favourites";
import TripHub from "./pages/TripHub";
import Testimonials from "./pages/Testimonials";
import Compare from "./pages/Compare";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import NotFound from "./pages/NotFound";
import OAuthConsent from "./pages/OAuthConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/trip/:id" element={<TripDetails />} />
          <Route path="/planner/:slug" element={<PlannerProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/trip-hub" element={<TripHub />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/terms-and-privacy" element={<TermsAndPrivacy />} />
          <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
