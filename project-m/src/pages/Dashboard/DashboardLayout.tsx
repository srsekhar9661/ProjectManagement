import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

export default function DashboardLayout() {
  const [showNav, setShowNav] = useState(true)
  
  return (
    <div className="flex flex-1 flex-row overflow-hidden bg-gray-100 w-screen h-full">
      
      {/* 🔷 Sidebar */}
      <div className="w-64 bg-blue-700 text-white h-full p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>

        <nav className="flex flex-col gap-4">
          <NavLink to="/dashboard" end>Home</NavLink>
          <NavLink to="/dashboard/projects">Projects</NavLink>
          <NavLink to="/dashboard/collaboration">collaboration</NavLink>
          <NavLink to="/dashboard/settings">Settings</NavLink>
        </nav>
      </div>

      {/* 🔷 Main Content */}
      <div className="flex-1 overflow-y-auto p-6 w-full scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-gray-200">
        

        <Outlet />
        
      </div>
    </div>
  );
}