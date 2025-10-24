"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import sdk from "@stackblitz/sdk";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generatedCode && previewRef.current) {
      // Clear previous preview
      previewRef.current.innerHTML = "";

      // Extract just the component code (remove markdown formatting)
      let cleanCode = generatedCode;
      if (cleanCode.includes("```")) {
        cleanCode = cleanCode.split("```")[1] || cleanCode;
        if (cleanCode.startsWith("tsx") || cleanCode.startsWith("ts") || cleanCode.startsWith("javascript")) {
          cleanCode = cleanCode.substring(cleanCode.indexOf("\n") + 1);
        }
      }

      // Create StackBlitz project
      sdk.embedProject(
        previewRef.current,
        {
          title: "Generated App",
          description: "AI-generated Next.js app",
          template: "node",
          files: {
            "package.json": JSON.stringify({
              name: "generated-app",
              version: "1.0.0",
              dependencies: {
                "react": "^18.2.0",
                "react-dom": "^18.2.0",
                "next": "^14.0.0"
              },
              scripts: {
                "dev": "next dev",
                "build": "next build",
                "start": "next start"
              }
            }, null, 2),
            "pages/index.tsx": cleanCode,
            "pages/_app.tsx": `export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}`,
            "next.config.js": `module.exports = {}`
          }
        },
        {
          openFile: "pages/index.tsx",
          view: "preview",
          height: 600
        }
      );
    }
  }, [generatedCode]);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Error: " + data.error },
        ]);
      } else {
        setGeneratedCode(data.code);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message || "Code generated successfully! Check the preview →" },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "An error occurred. Please try again." },
      ]);
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">KRE8SITES Builder</h1>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">
              What would you like to build?
            </h2>
            <Textarea
              placeholder="Describe your app idea in detail..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[120px] mb-4"
            />
            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full"
            >
              {loading ? "Generating..." : "Generate App"}
            </Button>
          </Card>

          <div className="space-y-2">
            {messages.map((msg, i) => (
              <Card
                key={i}
                className={"p-4 " + (msg.role === "user"
                    ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                    : "bg-muted max-w-[80%]")}
              >
                <p className="text-sm font-medium mb-1">
                  {msg.role === "user" ? "You" : "KRE8SITES AI"}
                </p>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div
            ref={previewRef}
            className="h-[600px] rounded-lg border bg-muted overflow-hidden"
          >
            {!generatedCode && (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">
                  Live preview will appear here once generation is complete
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
