import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = form.name.trim() || form.email.split("@")[0] || "Traveler";
    login({ name, email: form.email });
    toast.success(mode === "login" ? `Welcome back, ${name}!` : `Account created — welcome, ${name}!`);
    navigate("/");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="relative hidden lg:block bg-gradient-to-br from-primary to-accent overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&q=80"
          alt="Travel"
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/60" />
        <div className="relative h-full flex flex-col justify-between p-12 text-primary-foreground">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium opacity-90 hover:opacity-100">
            <ArrowLeft className="w-4 h-4" /> Back to Trippinity
          </Link>
          <div>
            <Sparkles className="w-10 h-10 mb-4 opacity-90" />
            <h1 className="text-4xl font-extrabold font-display leading-tight">
              Your travel tribe<br />is one trip away.
            </h1>
            <p className="opacity-90 mt-3 max-w-sm">
              Discover curated trips from verified planners. Book in seconds. Make memories.
            </p>
            <div className="flex items-center gap-2 mt-5 text-sm opacity-90">
              <ShieldCheck className="w-4 h-4" /> 100% verified planners · 12,000+ travelers
            </div>
          </div>
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm space-y-6 animate-fade-in">
          <div>
            <Link to="/" className="text-2xl font-extrabold font-display">
              Tripp<span className="text-accent">inity</span>
            </Link>
            <h2 className="text-2xl font-bold mt-6">
              {mode === "login" ? "Welcome back 👋" : "Create your account"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {mode === "login" ? "Sign in to continue." : "Start exploring trips in seconds."}
            </p>
          </div>

          <div className="flex bg-muted p-1 rounded-xl">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
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
              <div>
                <label className="text-sm font-medium mb-1 block">Name</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="you@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  required
                  type="password"
                  minLength={4}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-elevated"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>

          <p className="text-[11px] text-center text-muted-foreground">
            Demo auth — your session is stored locally. No emails are sent.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
