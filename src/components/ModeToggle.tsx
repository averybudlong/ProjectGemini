"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // Placeholder generated so that when page is reloaded the other text in the sidebar doesnt shift
    <div className="inline-block relative">
      {/* Placeholder */}
      <div className="invisible" aria-hidden="true">
        <Button
          variant="outline"
          className="flex items-center gap-1 py-1 px-2 text-l"
        >
          <div className="w-[1.25rem] h-[1.25rem]"></div>
        </Button>
      </div>
      {/* Actual button */}
      {mounted && (
        <Button
          variant="outline"
          onClick={handleToggle}
          className="flex items-center gap-1 py-1 px-2 text-l absolute top-0 left-0 hover:text-[hsl(var(--green-button-text))]"
        >
          <div className="relative w-[1.25rem] h-[1.25rem]">
            <Sun className="h-[1.25rem] w-[1.25rem] rotate-0 scale-0 transition-all dark:-rotate-90 dark:scale-100 absolute top-0 left-0" />
            <Moon className="h-[1.25rem] w-[1.25rem] rotate-0 scale-100 transition-all dark:rotate-0 dark:scale-0 absolute top-0 left-0" />
          </div>
          <span>{theme === "light" ? "Dark" : "Light"}</span>
        </Button>
      )}
    </div>
  );
}
