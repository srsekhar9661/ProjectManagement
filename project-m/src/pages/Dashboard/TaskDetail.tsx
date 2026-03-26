import { useState } from "react";
import { useParams } from "react-router-dom";

export default function TaskDetails() {
    const { taskId } = useParams()
  const [task, setTask] = useState({
    title: "Design Dashboard UI",
    description: "Create a responsive dashboard layout with sidebar and navbar.",
    status: "In Progress",
    priority: "High",
    dueDate: "2026-04-10",
    assignee: "Raja Sekhar",
  });

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "John", text: "Please update UI colors." },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const addComment = () => {
    if (!comment) return;

    setComments([
      ...comments,
      { id: Date.now(), user: "You", text: comment },
    ]);
    setComment("");
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-100">
      
      <h1 className="text-2xl font-bold mb-6">Task Details</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔹 LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Task Info */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <input
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              className="text-xl font-semibold w-full border-b mb-4 outline-none"
            />

            <textarea
              name="description"
              value={task.description}
              onChange={handleChange}
              rows={4}
              className="w-full border p-2 rounded-md"
            />
          </div>

          {/* Comments */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>

            <div className="space-y-3 mb-4">
              {comments.map((c) => (
                <div key={c.id} className="border p-3 rounded-md">
                  <p className="text-sm font-medium">{c.user}</p>
                  <p className="text-gray-600 text-sm">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 border p-2 rounded-md"
              />

              <button
                onClick={addComment}
                className="bg-blue-600 text-white px-4 rounded-md"
              >
                Send
              </button>
            </div>
          </div>

        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="space-y-6">

          {/* Task Meta */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-4">
            <h2 className="text-lg font-semibold">Details</h2>

            {/* Status */}
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              >
                <option>Todo</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm text-gray-500">Priority</label>
              <select
                name="priority"
                value={task.priority}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm text-gray-500">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>

            {/* Assignee */}
            <div>
              <label className="text-sm text-gray-500">Assignee</label>
              <input
                type="text"
                name="assignee"
                value={task.assignee}
                onChange={handleChange}
                className="w-full border p-2 rounded-md"
              />
            </div>

          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Save Changes
            </button>

            <button className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              Delete Task
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
