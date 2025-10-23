"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function BuilderPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);

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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Code generation started! Check back in a moment." },
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
          <h1 className="text-2xl font-bold">Vibe Builder</h1>
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
                  {msg.role === "user" ? "You" : "Vibe AI"}
                </p>
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card className="p-6 h-[600px] flex items-center justify-center bg-muted">
            <p className="text-muted-foreground">
              Preview will appear here once generation is complete
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
