"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/app/components/layout/Sidebar";
import Topbar from "@/app/components/layout/TopBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import AddProjectForm from "./add-project/page";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
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
          {/* 🔹 Page Header with Add Project Button */}
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

                {
                  <AddProjectForm />
                }
                
              </DialogContent>
            </Dialog>
          </div>

          {/* 🔹 Projects List */}
          {loading ? (
            <div className="flex items-center space-x-2 text-gray-600">
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Loading projects...</span>
            </div>
          ) : projects.length === 0 ? (
            <p className="text-gray-500">No projects found. Create one!</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="shadow-sm hover:shadow-md transition">
                  <CardHeader>
                    <CardTitle>{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      {project.description || "No description"}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Status: {project.status}
                    </p>
                    <p className="text-xs text-gray-400">
                      Owner: {project.owner?.name || "N/A"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
