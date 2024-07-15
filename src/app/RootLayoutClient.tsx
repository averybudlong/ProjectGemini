// app/RootLayoutClient.tsx
'use client'

import { useState } from "react";
import { ThemeProvider } from 'next-themes'
import Sidebar from '../components/Sidebar';

type RootLayoutClientProps = {
  children: React.ReactNode;
};

export default function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onOpen={() => setIsSidebarOpen(true)}
          onClose={() => setIsSidebarOpen(false)} 
        />
        <main className={`flex-1 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  )
}