// components/Sidebar.tsx
"use client";

import React from "react";
import { IconArrowBarLeft, IconArrowBarRight } from "@tabler/icons-react";
import ModeToggle from "../components/ModeToggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <div
        className={`fixed top-0 left-0 h-full w-60 z-30 transform transition-all duration-300 ease-in-out
                    bg-[hsl(var(--background))] text-[hsl(var(--foreground))]
                    border-r border-[hsl(var(--border))] ${
                      isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
      >
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-[visibility] duration-0 delay-285 ${
            isOpen ? "visible" : "invisible"
          }`}
        >
          <IconArrowBarLeft stroke={2} />
        </button>
        <span>
          <div className="m-2">
            <ModeToggle />
          </div>
        </span>
        <nav className="p-2">
          <ul className="space-y-2">
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[hsl(142,71%,45%)] hover:text-[hsl(var(--green-button-text))]"
                asChild
              >
                <Link href="/">Dashboard</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[hsl(142,71%,45%)] hover:text-[hsl(var(--green-button-text))]"
                asChild
              >
                <Link href="/colleges">Colleges</Link>
              </Button>
            </li>
            <li>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[hsl(142,71%,45%)] hover:text-[hsl(var(--green-button-text))]"
                asChild
              >
                <Link href="/about">About</Link>
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <button
        onClick={onOpen}
        className={`fixed top-4 left-4 z-40 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-[visibility] duration-0 delay-290 ${
          isOpen ? "invisible" : "visible"
        }`}
      >
        <IconArrowBarRight stroke={2} />
      </button>
    </>
  );
};

export default Sidebar;
