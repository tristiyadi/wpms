"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Settings, Users, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Packages", href: "/packages", icon: Package },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col w-64 h-screen bg-sidebar border-r border-sidebar-border sticky top-0 shadow-sm">
      <div className="flex items-center px-6 h-16 border-b border-sidebar-border">
        <h1 className="text-xl font-bold font-sans text-primary tracking-tight">
          WPMS Admin
        </h1>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200 rounded-md group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-sidebar-accent-foreground"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-sidebar-border text-center">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          © 2026 Wellness System
        </p>
      </div>
    </div>
  );
}
