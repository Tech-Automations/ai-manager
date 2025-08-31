"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import Topbar from "@/app/components/layout/TopBar";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { DataTable } from "@/app/components/ui/data-table";
import { columns, Project } from "./columns";
import AddProjectForm from "./add-project/page";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Projects</h1>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center space-x-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Project</span>
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a New Project</DialogTitle>
                </DialogHeader>
                <AddProjectForm />
              </DialogContent>
            </Dialog>
          </div>

          {loading ? (
            <div className="flex items-center space-x-2 text-gray-600">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Loading projects...</span>
            </div>
          ) : (
            <DataTable columns={columns} data={projects} />
          )}
        </main>
      </div>
    </div>
  );
}
