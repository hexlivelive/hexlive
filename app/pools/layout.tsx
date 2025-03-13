"use client";

import { useState } from "react";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function PoolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        activeTab="liquidity"
        setActiveTab={() => {}}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          activeTab="liquidity"
        />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
