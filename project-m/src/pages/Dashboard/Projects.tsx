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
  const [view, setView] = useState<"grid" | "table">("table");
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleCreateProject = async () => {
    try {
      await API.post("projects/create/", formData);

      setFormData({ name: "", description: "" });
      setShowCreate(false);

      fetchProjects(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };
  

  const fetchProjects = () => {
    API.get("projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  };

  const handleUpdate = async () => {
    if (!editingProject) return;

    try {
      await API.put(
        `projects/${editingProject.id}/update/`,
        editForm
      );

      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      await API.delete(`projects/${id}/delete/`);
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-6">

      {/* 🔷 Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Projects</h1>

        <div className="flex gap-3">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 rounded ${view === "grid" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Grid
          </button>

          <button
            onClick={() => setView("table")}
            className={`px-3 py-1 rounded ${view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            Table
          </button>

          <button
            onClick={() => setShowCreate(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Create
          </button>
        </div>
      </div>

      {showCreate && (
        <div className="bg-white p-6 rounded shadow border space-y-4">
          <h2 className="text-lg font-semibold">Create Project</h2>

          <input
            type="text"
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={handleCreateProject}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>

            <button
              onClick={() => setShowCreate(false)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="bg-white p-6 rounded shadow border space-y-4">
          <h2 className="text-lg font-semibold">Edit Project</h2>

          <input
            type="text"
            value={editForm.name}
            onChange={(e) =>
              setEditForm({ ...editForm, name: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <textarea
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Update
            </button>

            <button
              onClick={() => setEditingProject(null)}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* 🔷 GRID VIEW */}
      {view === "grid" && (

        <>
        {/* 🔷 Empty State */}
        {projects.length === 0 && (
          <div className="text-center text-gray-500">
            No projects available
          </div>
        )}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition"
            >
              <h3
                onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                className="text-lg font-semibold cursor-pointer hover:text-blue-600"
              >
                {project.name}
              </h3>

              <p className="text-gray-500 mt-2 text-sm">
                {project.description}
              </p>

              {/* Actions */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                  className="text-blue-600 text-sm"
                >
                  View
                </button>

                <button
                  onClick={() => {
                    setEditingProject(project);
                    setEditForm({
                      name: project.name,
                      description: project.description,
                    });
                  }}
                  className="text-yellow-600 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        </>
      )}

      {/* 🔷 TABLE VIEW */}
      {view === "table" && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-center border border-2 table">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Description</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              <>
              {/* 🔷 Empty State */}
              {projects.length === 0 ? (
                <tr>
                  <th colSpan={3} className="text-center text-gray-500 font-normal py-3">
                    No projects available
                  </th>
                </tr>
                ) :
                projects.map((project) => (
                  <tr key={project.id} className="border-t hover:bg-gray-50">
                    <td
                      className="p-3 cursor-pointer text-blue-600"
                      onClick={() =>
                        navigate(`/dashboard/projects/${project.id}`)
                      }
                    >
                      {project.name}
                    </td>

                    <td className="p-3 text-gray-500">
                      {project.description}
                    </td>

                    <td className="p-3 space-x-3">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/projects/${project.id}`)
                        }
                        className="text-blue-600"
                      >
                        View
                      </button>

                      <button
                        onClick={() => {
                          setEditingProject(project);
                          setEditForm({
                            name: project.name,
                            description: project.description,
                          });
                        }}
                        className="text-yellow-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(project.id)}
                        className="text-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
              </>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}