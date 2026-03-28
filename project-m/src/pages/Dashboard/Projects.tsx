import { useEffect, useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/project/ProjectCard";
import ProjectTableRow from "../../components/project/ProjectTableRow";
import ProjectForm from "../../components/project/ProjectForm";


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
        <ProjectForm
          onSubmit={async (data) => {
            await API.post("projects/create/", data);
            fetchProjects();
            setShowCreate(false);
          }}
          onCancel={() => setShowCreate(false)}
        />
      )}

      {editingProject && (
        <ProjectForm
          initialData={editingProject}
          isEdit
          onSubmit={async (data) => {
            await API.put(
              `projects/${editingProject.id}/update/`,
              data
            );
            setEditingProject(null);
            fetchProjects();
          }}
          onCancel={() => setEditingProject(null)}
        />
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
            <ProjectCard
              key={project.id}
              project={project}
              onDelete={handleDelete}
              onEdit={setEditingProject}
            />
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
                  <ProjectTableRow
                    key={project.id}
                    project={project}
                    onDelete={handleDelete}
                    onEdit={setEditingProject}
                  />
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