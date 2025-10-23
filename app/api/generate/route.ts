import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Find or create user in database
    let user = await prisma.user.findUnique({
      where: { supabaseId: session.user.id },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          supabaseId: session.user.id,
          email: session.user.email || "",
          credits: 2,
        },
      });
    }

    // Check credits
    if (user.credits < 1) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 402 }
      );
    }

    // Generate code with OpenAI
    const systemPrompt = `You are an expert Next.js and React developer. Generate complete, production-ready code based on user requirements.

Generate a complete Next.js page component with the following:
- Use "use client" directive if needed for interactivity
- Use Tailwind CSS for styling
- Include proper TypeScript types
- Make it responsive and modern
- Include all necessary imports
- Return ONLY the code, no explanations`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
    });

    const generatedCode = completion.choices[0]?.message?.content || "// Generation failed";

    // Create website record
    const website = await prisma.website.create({
      data: {
        userId: user.id,
        prompt: prompt,
        code: generatedCode,
        status: "completed",
      },
    });

    // Decrement credits
    await prisma.user.update({
      where: { id: user.id },
      data: { credits: user.credits - 1 },
    });

    return NextResponse.json({
      success: true,
      websiteId: website.id,
      code: generatedCode,
      creditsRemaining: user.credits - 1,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
