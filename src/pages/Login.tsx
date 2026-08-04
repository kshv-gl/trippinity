import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { Mail, Lock, Sparkles, ArrowLeft, ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { toast } from "sonner";

const safeNext = (raw: string | null): string => {
  if (!raw) return "/";
  // Same-origin relative paths only.
  if (!raw.startsWith("/") || raw.startsWith("//")) return "/";
  return raw;
};

const Login = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const next = safeNext(params.get("next"));
  const { login } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", dob: "" });
  const [busy, setBusy] = useState(false);

  const finish = (name: string, email: string, isLogin: boolean) => {
    login({ name, email, dob: form.dob || undefined });
    toast.success(isLogin ? `Welcome back, ${name}!` : `Account created! Welcome, ${name}!`);
    if (next.startsWith("/.lovable/oauth/consent")) {
      window.location.href = next;
    } else {
      navigate(next);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const name = form.name.trim() || form.email.split("@")[0] || "Traveler";
    try {
      if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: form.email,
          password: form.password,
        });
        if (error) throw error;
        finish(data.user?.user_metadata?.display_name ?? name, form.email, true);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin + next,
            data: { display_name: name },
          },
        });
        if (error) throw error;
        if (!data.session) {
          toast.success("Check your email to confirm your account.");
          setBusy(false);
          return;
        }
        finish(name, form.email, false);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Sign in failed");
      setBusy(false);
    }
  };

  const google = async () => {
    if (busy) return;
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin + next,
    });
    if (result.error) {
      toast.error(result.error.message ?? "Google sign-in failed");
      setBusy(false);
      return;
    }
    if (result.redirected) return;
    // Session set — capture name/email into mock hook and redirect.
    const { data } = await supabase.auth.getUser();
    const name =
      (data.user?.user_metadata?.display_name as string | undefined) ??
      (data.user?.user_metadata?.full_name as string | undefined) ??
      data.user?.email?.split("@")[0] ??
      "Traveler";
    finish(name, data.user?.email ?? "", true);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
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

          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="w-full h-11 rounded-xl border bg-background text-sm font-medium hover:bg-muted transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg width="16" height="16" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.4 0-11.5-5.1-11.5-11.5S17.6 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.3-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12.5 24 12.5c2.9 0 5.6 1.1 7.6 2.9l5.7-5.7C33.9 6.5 29.2 4.5 24 4.5 16.3 4.5 9.7 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.5c5.1 0 9.7-2 13.2-5.2l-6.1-5c-2 1.4-4.4 2.2-7.1 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.6 39 16.2 43.5 24 43.5z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.4l6.1 5C41 34 43.5 29.4 43.5 24c0-1.2-.1-2.3-.3-3.5z"/></svg>
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center"><span className="bg-background px-2 text-[11px] uppercase tracking-wide text-muted-foreground">or</span></div>
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
            {mode === "signup" && (
              <div>
                <label className="text-sm font-medium mb-1 block">Date of Birth</label>
                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  Used to personalise your Trippinity experience. Never shared.
                </p>
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
                  minLength={6}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full h-11 pl-10 pr-4 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="w-full h-12 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-elevated disabled:opacity-50"
            >
              {busy ? "…" : mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
