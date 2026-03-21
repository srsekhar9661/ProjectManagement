import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!formData.name) {
      alert("Project name is required");
      return;
    }

    try {
      setLoading(true);

      await API.post("projects/create/", formData);

      alert("Project created 🎉");
      navigate("/dashboard/projects");
    } catch (err) {
      console.log(err);
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">

      {/* 🔷 Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg border">

        {/* 🔷 Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Create New Project
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Start organizing your work by creating a new project.
          </p>
        </div>

        {/* 🔷 Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Project Name */}
          <div>
            <label className="text-sm text-gray-600">
              Project Name
            </label>
            <input
              type="text"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full mt-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center">

            <button
              type="button"
              onClick={() => navigate("/dashboard/projects")}
              className="text-gray-600 hover:underline"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-2 rounded-md text-white ${
                loading
                  ? "bg-blue-300"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Creating..." : "Create Project"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}