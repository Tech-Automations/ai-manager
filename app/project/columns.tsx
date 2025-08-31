"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/app/components/ui/button";
import { MoreHorizontal } from "lucide-react";

export type Project = {
  id: number;
  name: string;
  description: string | null;
  status: string;
  owner?: { name: string } | null;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "owner.name",
    header: "Owner",
    cell: ({ row }) => row.original.owner?.name || "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const project = row.original;
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => alert(`Edit/Delete project ${project.name}`)}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    },
  },
];
