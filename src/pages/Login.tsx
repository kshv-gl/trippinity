import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("trippinity:user", JSON.stringify({ name: form.name || "Traveler", email: form.email }));
    toast({ title: mode === "login" ? "Welcome back!" : "Account created", description: "You're signed in (demo)." });
    navigate("/profile");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Visual side */}
      <div className="hidden lg:block relative">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1400&q=80"
          alt="Travel inspiration"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/80 to-accent/40" />
        <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
          <Link to="/" className="font-display text-3xl font-extrabold">
            Tripp<span className="text-secondary">inity</span>
          </Link>
          <div>
            <h2 className="font-display text-4xl font-extrabold leading-tight">
              Your next great trip<br />starts in seconds.
            </h2>
            <p className="mt-3 text-white/90 max-w-md">
              Sign in to save favourites, track bookings, and unlock the Trip Hub for your group.
            </p>
            <div className="flex items-center gap-2 mt-6 text-sm">
              <ShieldCheck className="w-4 h-4 text-secondary" /> 100% verified planners
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div className="flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4" /> Back home
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold font-display">{mode === "login" ? "Welcome back" : "Create account"}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Sign in to continue your journey." : "Join thousands of travelers."}
            </p>
          </div>

          <div className="flex bg-muted p-1 rounded-xl">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 h-10 rounded-lg text-sm font-medium transition-colors ${
                  mode === m ? "bg-background shadow-soft" : "text-muted-foreground"
                }`}
              >
                {m === "login" ? "Login" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-3">
            {mode === "signup" && (
              <input
                required
                placeholder="Full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-12 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                required
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                required
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full h-12 pl-10 pr-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
            >
              {mode === "login" ? "Login" : "Create account"}
            </button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            Demo only — no real authentication. Enable Lovable Cloud to use real auth.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
