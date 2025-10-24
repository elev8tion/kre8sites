import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import OpenAI from "openai";
import { callReactinatorTool } from "@/lib/mcp-client";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Try to get authenticated user, but don't require it for testing
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    let user = null;
    let userId = "demo-user"; // Default for non-authenticated users

    if (session) {
      // Find or create user in database
      user = await prisma.user.findUnique({
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

      userId = user.id;

      // Check credits for authenticated users
      if (user.credits < 1) {
        return NextResponse.json(
          { error: "Insufficient credits. Please sign in to get free credits!" },
          { status: 402 }
        );
      }
    }

    // Step 1: Use OpenAI to analyze the prompt and determine what components are needed
    const analysisPrompt = `Analyze this user request and determine what type of React component should be created.
User request: "${prompt}"

Respond with JSON in this exact format:
{
  "componentType": "calculator|counter|todolist|form|dashboard|custom",
  "componentName": "MyComponentName",
  "features": ["feature1", "feature2"],
  "needsState": true|false
}`;

    const analysis = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: analysisPrompt }],
      temperature: 0.3,
    });

    let componentSpec;
    try {
      const analysisText = analysis.choices[0]?.message?.content || "{}";
      componentSpec = JSON.parse(analysisText);
    } catch {
      componentSpec = {
        componentType: "custom",
        componentName: "GeneratedComponent",
        features: [prompt],
        needsState: true,
      };
    }

    // Step 2: Use Reactinator MCP to generate the component
    let generatedCode;
    try {
      const result = await callReactinatorTool("generate_react_component", {
        componentName: componentSpec.componentName,
        componentType: componentSpec.needsState ? "stateful" : "stateless",
        description: prompt,
        features: componentSpec.features || [prompt],
        styling: "tailwind",
      });

      generatedCode = result.content[0]?.text || null;
    } catch (error) {
      console.error("Reactinator MCP error:", error);
      // Fallback to direct OpenAI generation if MCP fails
      const fallback = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "Generate a complete Next.js page component with TypeScript and Tailwind CSS. Return ONLY code, no explanations.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });
      generatedCode = fallback.choices[0]?.message?.content || "// Generation failed";
    }

    // Only save to database if user is authenticated
    let websiteId = null;
    if (user) {
      const website = await prisma.website.create({
        data: {
          userId: user.id,
          prompt: prompt,
          code: generatedCode,
          status: "completed",
        },
      });
      websiteId = website.id;

      // Decrement credits
      await prisma.user.update({
        where: { id: user.id },
        data: { credits: user.credits - 1 },
      });
    }

    return NextResponse.json({
      success: true,
      websiteId: websiteId,
      code: generatedCode,
      creditsRemaining: user ? user.credits - 1 : null,
      message: user ? "Code generated successfully!" : "Code generated! Sign in to save your projects and get free credits.",
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
