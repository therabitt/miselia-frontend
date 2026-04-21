// ═════════════════════════════════════════════════════════════════════════════
// File    : components/layout/DashboardSidebar.tsx
// Desc    : Dashboard sidebar — Refined Professional style (dark #18181B).
//           Nav items: Find Papers, Library, Chat, Projects.
//           Project shortcuts: 3 project terbaru (TODO Fase 1).
//           Bottom: Settings, Subscription link.
//           Implementasi penuh di Fase 1 — saat ini nav items skeleton.
// Layer   : Components / Layout
// Step    : STEP 11 (skeleton) → Fase 1 (implementasi penuh)
// Ref     : Blueprint §2.3 DashboardSidebar.tsx, STEP 1 Dashboard = Sidebar Left
// ═════════════════════════════════════════════════════════════════════════════

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  BookOpen,
  MessageSquare,
  FolderOpen,
  Settings,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    label: "Find Papers",
    href: "/find-papers",
    icon: Search,
  },
  {
    label: "Library",
    href: "/library",
    icon: BookOpen,
  },
  {
    label: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
] as const;

const BOTTOM_ITEMS = [
  {
    label: "Subscription",
    href: "/subscription",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-56 flex-shrink-0 flex-col bg-sidebar">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link href="/find-papers">
          <span className="font-baskervville text-lg font-bold text-sidebar-foreground">
            Miselia
          </span>
        </Link>
      </div>

      {/* Main nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href ||
              pathname.startsWith(item.href + "/");
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "sidebar-nav-item",
                    isActive && "active"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Project shortcuts — TODO Fase 1: load 3 recent projects */}
        <div className="mt-6">
          <p className="label-caps px-3 pb-2 text-sidebar-foreground/40">
            Project Terbaru
          </p>
          {/* Skeleton placeholder */}
          <div className="space-y-1 px-3">
            <div className="h-4 rounded bg-sidebar-accent/50" />
            <div className="h-4 rounded bg-sidebar-accent/50" />
          </div>
        </div>
      </nav>

      {/* Bottom nav */}
      <div className="border-t border-sidebar-border px-2 py-3">
        <ul className="space-y-1">
          {BOTTOM_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "sidebar-nav-item",
                    isActive && "active"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
