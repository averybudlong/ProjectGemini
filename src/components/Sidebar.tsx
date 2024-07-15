// components/Sidebar.tsx
'use client'

import React from 'react';
import { IconArrowBarLeft, IconArrowBarRight } from '@tabler/icons-react';

interface SidebarProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onOpen, onClose }) => {
  return (
    <>
      <div 
        className={`fixed top-0 left-0 h-full w-64 z-30 transform transition-all duration-300 ease-in-out
                    bg-[hsl(var(--background))] text-[hsl(var(--foreground))]
                    border-r border-[hsl(var(--border))] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          onClick={onClose} 
          className={`absolute top-4 right-4 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-[visibility] duration-0 delay-285 ${
            isOpen ? 'visible' : 'invisible'}`}
        >
          {/* Close */}
          <IconArrowBarLeft stroke={2} />
        </button>
        <nav className="p-4">
          <ul className="mt-8">
            <li className="mb-2"><a href="#" className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent-foreground))]">Home</a></li>
            <li className="mb-2"><a href="#" className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent-foreground))]">Colleges</a></li>
            <li className="mb-2"><a href="#" className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent-foreground))]">About</a></li>
          </ul>
        </nav>
      </div>

      <button 
        onClick={onOpen}
        className={`fixed top-4 left-4 z-40 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-[visibility] duration-0 delay-285 ${
          isOpen ? 'invisible' : 'visible'
        }`}
      >
        {/* Open */}
        <IconArrowBarRight stroke={2} /> 
      </button>
    </>
  );
};

export default Sidebar;