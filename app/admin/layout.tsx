"use client";

import { useState } from "react";
import { AdminSidebar } from "@/components/admin-sidebar";
import { IdleLogout } from "./components/IdleLogout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <IdleLogout />
      {/* Sidebar */}
      <AdminSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header
          className="
            flex items-center gap-4
            border-b border-foreground/10
            px-4 py-3
            lg:hidden
          "
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="
              text-lg opacity-80 hover:opacity-100
              transition
            "
            aria-label="Open menu"
          >
            ☰
          </button>

          <span className="text-sm font-semibold tracking-tight">
            Admin Panel
          </span>
        </header>

        {/* Content */}
        <main
          className="
            flex-1 overflow-y-auto
            bg-background
            p-4 sm:p-6
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
