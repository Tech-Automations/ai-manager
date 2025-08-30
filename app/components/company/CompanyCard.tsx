"use client";

import Link from "next/link";

export type Company = {
  id: number;
  name: string;
  domain?: string | null;
  subscriptionPlan: string;
};

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <li className="p-4 border rounded-xl shadow hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{company.name}</h3>
      {company.domain && (
        <p className="text-sm text-gray-600">{company.domain}</p>
      )}
      <p className="text-xs mt-2 text-gray-500">
        Plan: {company.subscriptionPlan}
      </p>
      <Link
        href={`/dashboard/companies/${company.id}`}
        className="inline-block mt-3 text-blue-600 hover:underline text-sm"
      >
        View details →
      </Link>
    </li>
  );
}
