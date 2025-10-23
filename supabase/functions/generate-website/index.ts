import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { prompt, userId } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      throw new Error("OPENAI_API_KEY not set");
    }

    const systemPrompt = `You are an expert Next.js and React developer. Generate complete, production-ready code based on user requirements.
    
Generate a complete Next.js page component with the following:
- Use "use client" directive if needed for interactivity
- Use Tailwind CSS for styling
- Include proper TypeScript types
- Make it responsive and modern
- Include all necessary imports
- Return ONLY the code, no explanations`;

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + openaiApiKey,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
          temperature: 0.7,
        }),
      }
    );

    const openaiData = await openaiResponse.json();
    const generatedCode =
      openaiData.choices?.[0]?.message?.content ?? "// Generation failed";

    const { data: userData } = await supabaseClient
      .from("User")
      .select("credits")
      .eq("supabaseId", userId)
      .single();

    if (!userData || userData.credits < 1) {
      return new Response(
        JSON.stringify({ error: "Insufficient credits" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 402,
        }
      );
    }

    await supabaseClient
      .from("User")
      .update({ credits: userData.credits - 1 })
      .eq("supabaseId", userId);

    const { data: websiteData, error: websiteError } = await supabaseClient
      .from("Website")
      .insert({
        userId: userId,
        prompt: prompt,
        code: generatedCode,
        status: "completed",
      })
      .select()
      .single();

    if (websiteError) throw websiteError;

    return new Response(
      JSON.stringify({
        success: true,
        websiteId: websiteData.id,
        code: generatedCode,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
