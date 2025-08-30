"use client";

import CompanyCard, { Company } from "./CompanyCard";

export default function CompanyList({ companies }: { companies: Company[] }) {
  if (companies.length === 0) {
    return <p className="text-gray-500">No companies yet. Create one to get started.</p>;
  }

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {companies.map((c) => (
        <CompanyCard key={c.id} company={c} />
      ))}
    </ul>
  );
}
