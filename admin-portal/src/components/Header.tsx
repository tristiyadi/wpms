"use client";

import { Bell } from "lucide-react";
import dynamic from "next/dynamic";

// Disable SSR for theme toggle to avoid hydration mismatch and setState warnings
const ThemeToggle = dynamic(() => import("./ThemeToggle").then(mod => mod.ThemeToggle), { 
  ssr: false,
  loading: () => <div className="p-2 h-9 w-9" />
});

export function Header({ title }: { title: string }) {
  return (
    <header className="h-16 bg-background/80 border-b border-border flex items-center justify-between px-8 sticky top-0 z-10 backdrop-blur-md">
      <h2 className="text-xl font-bold text-foreground font-sans tracking-tight">{title}</h2>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        
        <button className="p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground rounded-full transition-colors relative shadow-2xs">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-destructive rounded-full border-2 border-background"></span>
        </button>
        
        <div className="flex items-center space-x-3 pl-4 border-l border-border">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shadow-sm">
            AD
          </div>
          <div className="flex flex-col items-start leading-none hidden lg:flex">
             <span className="text-sm font-semibold text-foreground">Admin User</span>
             <span className="text-[10px] text-muted-foreground mt-1">Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}
