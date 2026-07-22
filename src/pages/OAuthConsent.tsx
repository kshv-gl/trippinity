import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ShieldCheck, Sparkles, Loader2 } from "lucide-react";

// Typed wrapper for the beta supabase.auth.oauth namespace.
type OAuthDetails = {
  redirect_url?: string;
  redirect_to?: string;
  client?: { name?: string; redirect_uri?: string };
  scope?: string;
};
type OAuthClient = {
  getAuthorizationDetails: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
  approveAuthorization: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
  denyAuthorization: (id: string) => Promise<{ data: OAuthDetails | null; error: { message: string } | null }>;
};
const oauthClient = () => (supabase.auth as unknown as { oauth: OAuthClient }).oauth;

const OAuthConsent = () => {
  const [params] = useSearchParams();
  const authorizationId = params.get("authorization_id") ?? "";
  const [details, setDetails] = useState<OAuthDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      if (!authorizationId) return setError("Missing authorization_id");
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        const next = window.location.pathname + window.location.search;
        window.location.href = "/login?next=" + encodeURIComponent(next);
        return;
      }
      const { data, error } = await oauthClient().getAuthorizationDetails(authorizationId);
      if (!active) return;
      if (error) return setError(error.message);
      const immediate = data?.redirect_url ?? data?.redirect_to;
      if (immediate && !data?.client) {
        window.location.href = immediate;
        return;
      }
      setDetails(data);
    })();
    return () => {
      active = false;
    };
  }, [authorizationId]);

  const decide = async (approve: boolean) => {
    setBusy(true);
    const { data, error } = approve
      ? await oauthClient().approveAuthorization(authorizationId)
      : await oauthClient().denyAuthorization(authorizationId);
    if (error) {
      setBusy(false);
      return setError(error.message);
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      return setError("No redirect returned by the authorization server.");
    }
    window.location.href = target;
  };

  if (error) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-muted/30">
        <div className="max-w-md w-full bg-card border rounded-2xl p-8 shadow-soft">
          <h1 className="text-xl font-extrabold font-display">Couldn't load this request</h1>
          <p className="text-sm text-muted-foreground mt-2">{error}</p>
        </div>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </main>
    );
  }

  const clientName = details.client?.name ?? "This app";

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-muted/30">
      <div className="max-w-md w-full bg-card border rounded-2xl p-8 shadow-soft">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Authorize</p>
            <h1 className="text-lg font-extrabold font-display">
              Connect {clientName} to Trippinity
            </h1>
          </div>
        </div>

        <p className="text-sm text-foreground/80">
          <strong>{clientName}</strong> will be able to call Trippinity's enabled tools
          (search trips, view details, list destinations & planners) while you are signed in.
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-success mt-0.5" />
            <span>Share your basic profile & email</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-success mt-0.5" />
            <span>Call Trippinity's public trip catalog tools as you</span>
          </li>
        </ul>

        <p className="text-[11px] text-muted-foreground mt-4">
          This does not bypass Trippinity's permissions or backend policies.
        </p>

        <div className="grid grid-cols-2 gap-3 mt-6">
          <button
            disabled={busy}
            onClick={() => decide(false)}
            className="h-11 rounded-xl border bg-background text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
          >
            Cancel connection
          </button>
          <button
            disabled={busy}
            onClick={() => decide(true)}
            className="h-11 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-elevated disabled:opacity-50"
          >
            {busy ? "…" : "Approve"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default OAuthConsent;
