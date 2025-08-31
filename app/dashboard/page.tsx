"use client";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/TopBar";
import StatsCard from "../components/layout/StatsCard";

export default function DashboardPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard title="All Users" value="10,234" color="bg-yellow-500" />
            <StatsCard title="Event Count" value="536" color="bg-orange-500" />
            <StatsCard title="Conversations" value="21" color="bg-green-500" />
            <StatsCard title="New Users" value="3,321" color="bg-blue-500" />
          </div>

          {/* TODO: Charts and tables go here */}
          <div className="bg-zinc-900 text-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Reports Snapshot</h3>
            <p>📊 Chart will be added here</p>
          </div>
        </main>
      </div>
    </div>
  );
}
