"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  Wallet,
  Layers,
  Settings,
  HelpCircle,
  X,
  Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const routes = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard, path: "/" },
  {
    id: "transactions",
    name: "Transactions",
    icon: Layers,
    path: "/transactions",
  },
  { id: "blocks", name: "Blocks", icon: Layers, path: "/blocks" },
  { id: "wallet", name: "Wallet", icon: Wallet, path: "/wallet" },
  { id: "liquidity", name: "Liquidity Pools", icon: Droplets, path: "/pools" },
  { id: "analytics", name: "Analytics", icon: BarChart3, path: "/analytics" },
  { id: "settings", name: "Settings", icon: Settings, path: "/settings" },
  { id: "help", name: "Help", icon: HelpCircle, path: "/help" },
];

export default function Sidebar({
  open,
  setOpen,
  activeTab,
  setActiveTab,
}: SidebarProps) {
  const isMobile = useMobile();

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-800/50 bg-black/80 p-4 backdrop-blur-md transition-transform duration-200 ease-in-out md:relative md:z-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 text-gray-400 hover:text-cyan-400 md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        )}

        <div className="mt-8 flex flex-col gap-6">
          <div className="flex items-center gap-2 px-2">
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 animate-pulse rounded-full bg-cyan-500 blur-sm"></div>
              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-black text-cyan-400">
                <span className="font-mono text-xs font-bold">BC</span>
              </div>
            </div>
            <h2 className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-xl font-bold text-transparent">
              NEOCRYPT
            </h2>
          </div>

          <nav className="flex flex-col gap-1">
            {routes.map((link) => (
              <Link key={link.id} href={link.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 px-2 text-gray-400 hover:bg-gray-800/50 hover:text-cyan-400",
                    activeTab === link.id && "bg-cyan-900/20 text-cyan-400"
                  )}
                  onClick={() => handleNavigation(link.id)}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="mt-auto rounded-lg border border-purple-500/20 bg-purple-900/10 p-4 shadow-[0_0_10px_rgba(128,0,255,0.1)]">
            <h3 className="text-sm font-medium text-purple-400">
              Network Status
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs text-gray-400">Ethereum Mainnet</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">Gas</span>
              <span className="text-xs font-medium text-green-400">
                12 Gwei
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
