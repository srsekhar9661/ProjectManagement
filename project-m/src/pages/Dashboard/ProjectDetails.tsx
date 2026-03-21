import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

export default function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  // Load project
  useEffect(() => {
    API.get(`projects/${id}/`).then(res => setProject(res.data));
    API.get(`projects/${id}/tasks/`).then(res => setTasks(res.data));
  }, [id]);

  // Create task
  const createTask = async () => {
    await API.post(`projects/${id}/tasks/create/`, {
      title: title,
    });

    setTitle("");
    const res = await API.get(`projects/${id}/tasks/`);
    setTasks(res.data);
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      {/* 🔷 Project Info */}
      <div>
        <h1 className="text-2xl font-bold">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>

      {/* 🔷 Add Task */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Add Task</h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 mr-2"
        />

        <button
          onClick={createTask}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* 🔷 Tasks List */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Tasks</h2>

        <div className="grid gap-3">
          {tasks.map((task) => (
            <div key={task.id} className="p-3 bg-gray-100 rounded">
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-500">
                Status: {task.status}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}