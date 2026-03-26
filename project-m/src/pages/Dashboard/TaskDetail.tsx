import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TaskDetails() {
  const { taskId } = useParams();

  const [task, setTask] = useState(null);
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    // Dummy data (replace with API)
    const data = {
      id: taskId,
      title: "Build Dashboard UI",
      description: "Create a clean and responsive dashboard layout.",
      status: "In Progress",
      priority: "High",
      dueDate: "2026-04-10",
      assignee: "Raja Sekhar",
      comments: [
        { id: 1, user: "John", text: "Update sidebar spacing", time: "2h ago" },
      ],
      attachments: [
        { id: 1, name: "design.png" },
      ],
    };

    setTask(data);
  }, [taskId]);

  if (!task) return <div className="p-6">Loading...</div>;

  // 🔹 Add Comment
  const addComment = () => {
    if (!comment) return;

    setTask({
      ...task,
      comments: [
        ...task.comments,
        {
          id: Date.now(),
          user: "You",
          text: comment,
          time: "Just now",
        },
      ],
    });

    setComment("");
  };

  // 🔹 Add File
  const handleFileUpload = () => {
    if (!file) return;

    setTask({
      ...task,
      attachments: [
        ...task.attachments,
        { id: Date.now(), name: file.name },
      ],
    });

    setFile(null);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-100">
        <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 hover:underline"
        >
            ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6">Task Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔹 LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Task Info */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-3">{task.title}</h1>
            <p className="text-gray-600">{task.description}</p>
          </div>

          {/* Comments */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Comments</h2>

            <div className="space-y-3 mb-4">
              {task.comments.map((c) => (
                <div key={c.id} className="border p-3 rounded-md">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{c.user}</span>
                    <span className="text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-gray-600">{c.text}</p>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
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

          {/* Attachments */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Attachments</h2>

            <div className="space-y-2 mb-4">
              {task.attachments.map((file) => (
                <div
                  key={file.id}
                  className="border p-2 rounded-md text-sm"
                >
                  📄 {file.name}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="border p-1 rounded-md"
              />

              <button
                onClick={handleFileUpload}
                className="bg-green-600 text-white px-4 rounded-md"
              >
                Upload
              </button>
            </div>
          </div>

        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="space-y-6">

          {/* Details */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">
            <h2 className="text-lg font-semibold">Details</h2>

            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Due:</strong> {task.dueDate}</p>
            <p><strong>Assignee:</strong> {task.assignee}</p>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Edit Task
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