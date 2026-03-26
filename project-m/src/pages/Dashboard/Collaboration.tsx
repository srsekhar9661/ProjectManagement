import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Collaboration() {
  const navigate = useNavigate();

  const [view, setView] = useState("grid"); // grid | table
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const projects = [
    { id: 1, name: "Project Alpha", owner: "John", role: "Editor", status: "Active" },
    { id: 2, name: "Task Manager", owner: "Ravi", role: "Viewer", status: "Active" },
    { id: 3, name: "AI Chatbot", owner: "Sneha", role: "Admin", status: "Completed" },
    { id: 4, name: "E-commerce App", owner: "Amit", role: "Editor", status: "Active" },
  ];

  // 🔥 Filtering Logic
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(search.toLowerCase()) ||
      project.owner.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Collaboration Projects</h1>

      {/* 🔹 Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-md w-full md:w-1/3"
        />

        {/* Filters */}
        <div className="flex gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>

          {/* View Toggle */}
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Grid
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-3 py-1 rounded ${
              view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {/* 🔹 GRID VIEW */}
      {view === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl shadow p-5 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm text-gray-500">Owner: {project.owner}</p>

              <p className="text-sm mt-2">
                Role: <span className="text-blue-600">{project.role}</span>
              </p>

              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    project.status === "Active"
                      ? "text-green-600"
                      : "text-gray-500"
                  }
                >
                  {project.status}
                </span>
              </p>

              <button
                onClick={() =>
                  navigate(`/dashboard/projects/${project.id}`)
                }
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Open Project
              </button>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 TABLE VIEW */}
      {view === "table" && (
        <div className="bg-white rounded-2xl shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Project</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Role</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProjects.map((project) => (
                <tr key={project.id} className="border-t">
                  <td className="p-3">{project.name}</td>
                  <td className="p-3">{project.owner}</td>
                  <td className="p-3 text-blue-600">{project.role}</td>
                  <td className="p-3">
                    <span
                      className={
                        project.status === "Active"
                          ? "text-green-600"
                          : "text-gray-500"
                      }
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        navigate(`/dashboard/projects/${project.id}`)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔹 Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center mt-10 text-gray-500">
          No projects found
        </div>
      )}
    </div>
  );
}