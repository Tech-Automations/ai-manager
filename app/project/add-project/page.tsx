"use client";

import Sidebar from "@/app/components/layout/Sidebar";
import Topbar from "@/app/components/layout/TopBar";
import { useState } from "react";

export default function AddProjectForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "active",
    startDate: "",
    endDate: "",
    companyId: 1, // temp: hardcoded (later: from logged in company context)
    ownerId: 1,   // temp: hardcoded (later: from logged in user)
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }

      const data = await res.json();
      setMessage(`✅ Project "${data.name}" created successfully!`);
      setFormData({
        name: "",
        description: "",
        status: "active",
        startDate: "",
        endDate: "",
        companyId: 1,
        ownerId: 1,
      });
    } catch (error) {
      console.error(error);
      setMessage("❌ Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
    <div>
        <label className="block text-sm font-medium font-black">Name</label>
        <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
        />
    </div>

    <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        />
    </div>

    <div>
        <label className="block text-sm font-medium">Status</label>
        <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        >
        <option value="active">Active</option>
        <option value="on-hold">On Hold</option>
        <option value="completed">Completed</option>
        </select>
    </div>

    <div className="flex gap-4">
        <div className="flex-1">
        <label className="block text-sm font-medium">Start Date</label>
        <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
        />
        </div>
        <div className="flex-1">
        <label className="block text-sm font-medium">End Date</label>
        <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
        />
        </div>
    </div>

    <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={loading}
    >
        {loading ? "Creating..." : "Create Project"}
    </button>

    {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
