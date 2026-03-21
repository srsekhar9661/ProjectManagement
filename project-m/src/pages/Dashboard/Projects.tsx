import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  name: string;
  description: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>

        <button
          onClick={() => navigate("/dashboard/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Create Project
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects available</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/dashboard/projects/${project.id}`)}
              className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-500 mt-2">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}