// components/Sidebar.tsx
'use client'

import React, { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-all duration-300 ease-in-out
                    bg-[hsl(var(--background))] text-[hsl(var(--foreground))]
                    border-r border-[hsl(var(--border))] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-4 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
        >
          Close
        </button>
        <nav className="p-4">
          <ul>
            <li className="mb-2"><a href="#" className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent-foreground))]">Home</a></li>
            <li className="mb-2"><a href="#" className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent-foreground))]">Colleges</a></li>
            <li className="mb-2"><a href="#" className="text-[hsl(var(--foreground))] hover:text-[hsl(var(--accent-foreground))]">About</a></li>
          </ul>
        </nav>
      </div>

      {/* Open button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
      >
        Menu
      </button>
    </>
  );
};

export default Sidebar;