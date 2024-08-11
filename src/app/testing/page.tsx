"use client";

import { callMenuSuggestionFlow } from "@/app/genkit";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [menuItem, setMenuItem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const theme = formData.get("theme")?.toString() ?? "";

    try {
      const suggestion = await callMenuSuggestionFlow(theme);
      setMenuItem(suggestion);
    } catch (error) {
      console.error("Error generating menu item:", error);
      setMenuItem("Failed to generate menu item. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="theme">
            Suggest a menu item for a restaurant with this theme:
          </Label>
          <Input
            type="text"
            id="theme"
            name="theme"
            required
            placeholder="Enter restaurant theme"
            autoComplete="off"
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Generating..." : "Generate"}
        </Button>
      </form>
      {menuItem && (
        <div className="mt-6">
          <h2 className="font-bold mb-2">Suggested Menu Item:</h2>
          <div className="bg-muted p-4 rounded">{menuItem}</div>
        </div>
      )}
    </main>
  );
}
