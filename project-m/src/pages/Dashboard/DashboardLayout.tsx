import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      
      {/* 🔷 Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-5">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard" end>Home</NavLink>
          <NavLink to="/dashboard/projects">Projects</NavLink>
          <NavLink to="/dashboard/create">Create Project</NavLink>
        </nav>
      </div>

      {/* 🔷 Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}