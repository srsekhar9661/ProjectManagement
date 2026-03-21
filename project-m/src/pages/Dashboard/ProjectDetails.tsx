import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [view, setView] = useState<"grid" | "table">("grid");

  useEffect(() => {
    API.get(`projects/${id}/`).then((res) => setProject(res.data));
    API.get(`projects/${id}/tasks/`).then((res) => setTasks(res.data));
  }, [id]);

  const fetchTasks = async () => {
    const res = await API.get(`projects/${id}/tasks/`);
    setTasks(res.data);
  };

  const createTask = async () => {
    await API.post(`projects/${id}/tasks/create/`, taskData);

    setTaskData({ title: "", description: "" });
    setShowForm(false);
    fetchTasks();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-700";
      case "progress":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      {/* 🔷 Project Header */}
      <div className="bg-white p-5 rounded shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* 🔷 Controls */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Tasks</h2>

        <div className="flex gap-2">
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

      {/* 🔷 TASK GRID */}
      {view === "grid" && (
        <div className="grid md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white p-4 rounded shadow hover:shadow-md transition"
            >
              <h3 className="font-semibold">{task.title}</h3>

              <p className="text-sm text-gray-500 mt-2">
                {task.description}
              </p>

              <span
                className={`inline-block mt-3 px-2 py-1 text-xs rounded ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>

              {/* Actions */}
              <div className="flex justify-between mt-4 text-sm">
                <button className="text-blue-600">Edit</button>
                <button className="text-red-600">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔷 TASK TABLE */}
      {view === "table" && (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3 text-gray-500">
                    {task.description}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>

                  <td className="p-3 space-x-3">
                    <button className="text-blue-600">Edit</button>
                    <button className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔷 Add Task Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow w-full max-w-md">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Add Task</h2>
              <button onClick={() => setShowForm(false)}>✕</button>
            </div>

            <input
              type="text"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              placeholder="Task title"
              className="border p-2 w-full mb-3"
            />

            <textarea
              rows={4}
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              placeholder="Description"
              className="border p-2 w-full mb-3"
            />

            <button
              onClick={createTask}
              className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            >
              Create Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}