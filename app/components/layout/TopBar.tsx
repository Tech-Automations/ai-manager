"use client";
import "../../../app/components/layout/TopBar";
import { Bell, UserCircle } from "lucide-react";

export default function Topbar() {
  return (
    <header className="h-16 bg-zinc-900 text-white flex items-center justify-between px-6 shadow">
      <input
        type="text"
        placeholder="Search..."
        className="bg-zinc-800 px-3 py-2 rounded-lg w-64"
      />
      <div className="flex items-center gap-4">
        <Bell className="w-6 h-6 cursor-pointer" />
        <UserCircle className="w-8 h-8 cursor-pointer" />
      </div>
    </header>
  );
}
