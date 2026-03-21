import { useEffect, useState } from "react";
import API from "../../api";

export default function DashboardHome() {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
  });

  useEffect(() => {
    // 🔹 Get user from backend (optional later)
    const storedUser = localStorage.getItem("access");

    if (storedUser) {
      setUser({
        username: "User", // replace later with API
        organization: "My Organization",
      });
    }

    // 🔹 Fetch projects count
    API.get("projects/")
      .then((res) =>
        setStats((prev) => ({
          ...prev,
          projects: res.data.length,
        }))
      )
      .catch(() => {});

    // 🔹 Fetch tasks count (optional)
    // API.get("tasks/")
  }, []);

  return (
    <div className="space-y-8">

      {/* 🔷 Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.username} 👋
        </h1>
        <p className="mt-2 text-blue-100">
          Organization: {user?.organization}
        </p>
      </div>

      {/* 🔷 Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow border">
          <h3 className="text-gray-500">Projects</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.projects}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h3 className="text-gray-500">Tasks</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.tasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-purple-600">
            0
          </p>
        </div>

      </div>

      {/* 🔷 Quick Actions */}
      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create Project
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Task
          </button>
        </div>
      </div>

      {/* 🔷 Recent Projects */}
      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Recent Projects
        </h2>

        <p className="text-gray-500">
          Your recently created projects will appear here.
        </p>
      </div>

    </div>
  );
}