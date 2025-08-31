"use client";

import { Home, BarChart2, Layers, Calendar, Users, Settings } from "lucide-react";
import Link from "next/link";

const menu = [
  { name: "Dashboard", icon: Home, href: "/dashboard" },
  { name: "Projects", icon: Layers, href: "/project" },
  { name: "Users", icon: Users, href: "/dashboard/users" }
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-zinc-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">AI Manager</div>
      <nav className="flex-1">
        <ul>
          {menu.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="flex items-center gap-3 p-3 hover:bg-zinc-800"
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
