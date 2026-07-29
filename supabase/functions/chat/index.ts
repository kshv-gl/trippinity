// Trippinity AI travel assistant — streamed via Lovable AI Gateway.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Trippy, the AI travel assistant for Trippinity — India's curated trip marketplace where verified local travel companies list group and curated trips.

PERSONALITY: Friendly, warm, and concise. Speak like a knowledgeable travel friend, not a corporate bot. Max 3 short sentences per reply unless the user asks for details.

WHAT YOU KNOW:
- Trippinity lists curated trips from verified Indian travel companies
- Current trips: Manali (₹12,999 / 4N5D by Himalayan Trails Co.), Goa (₹8,499 / 3N4D by Coastal Escapes), Kerala Backwaters (₹15,999 / 5N6D by Kerala Trails), Rajasthan Heritage (₹18,500 / 6N7D by Royal Rajasthan Tours), Andaman (₹22,000 / 5N6D by Coastal Escapes), Leh Ladakh Bike Expedition (₹25,999 / 7N8D by Ride India Expeditions)
- Booking: pay 25% upfront to confirm, balance later
- After booking, users unlock Trip Hub — a group chat with fellow travelers and the planner
- All planners are verified; users can compare trips and read real reviews

RULES:
- Keep responses under 60 words unless the user asks for an itinerary or detailed info
- Never make up prices, dates, or trip details not listed above
- If asked about something you don't know, say "I don't have that info — check the listings at /explore for the latest details"
- Do not use bullet points for short answers; use them only when listing 3 or more items
- Never start a reply with "Great question!" or similar filler phrases
- If the user seems ready to book, end with: "Want me to take you to that trip?" and include the trip URL`;


Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages must be an array" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add credits to your Lovable AI workspace." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
