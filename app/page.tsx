import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const templates = [
  { id: "netflix", name: "Build a Netflix clone", icon: "📺" },
  { id: "dashboard", name: "Build an admin dashboard", icon: "📊" },
  { id: "kanban", name: "Build a kanban board", icon: "📋" },
  { id: "filemanager", name: "Build a file manager", icon: "📁" },
  { id: "youtube", name: "Build a YouTube clone", icon: "🎥" },
  { id: "store", name: "Build a store page", icon: "🏪" },
  { id: "airbnb", name: "Build an Airbnb clone", icon: "🏠" },
  { id: "spotify", name: "Build a Spotify clone", icon: "🎵" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <nav className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Vibe</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">
            Build something with Vibe
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Create apps and websites by chatting with AI
          </p>
          <Link href="/builder">
            <Button size="lg" className="text-lg px-8 py-6">
              Start Building
            </Button>
          </Link>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Popular Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {templates.map((template) => (
              <Link key={template.id} href={`/builder?template=${template.id}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="text-4xl mb-2">{template.icon}</div>
                  <p className="font-medium">{template.name}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-4">
            How it works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="text-4xl mb-4">💬</div>
              <h4 className="font-semibold mb-2">1. Describe your idea</h4>
              <p className="text-muted-foreground">
                Tell our AI what you want to build in plain English
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🤖</div>
              <h4 className="font-semibold mb-2">2. AI generates code</h4>
              <p className="text-muted-foreground">
                Our AI creates a complete, working application
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">🚀</div>
              <h4 className="font-semibold mb-2">3. Preview & deploy</h4>
              <p className="text-muted-foreground">
                See your app live instantly and share it with the world
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Vibe. Built with Next.js, Supabase, and OpenAI.</p>
        </div>
      </footer>
    </div>
  );
}
