"use client";

interface StatsCardProps {
  title: string;
  value: string | number;
  color: string; // Tailwind bg color
}

export default function StatsCard({ title, value, color }: StatsCardProps) {
  return (
    <div className={`p-4 rounded-xl shadow ${color} text-white`}>
      <p className="text-sm">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}
