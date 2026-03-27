import { useEffect, useState } from "react";
import { useParams, NavLink, useLocation, useNavigate } from "react-router-dom";
import API from "../../api";

type Task = {
  id: number;
  title: string;
  description: string;
  status: "pending" | "progress" | "done";
  assigned_to?: string;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const location = useLocation()
  const navigate = useNavigate()

  // 🔹 Role (mock for now)
  const [role, setRole] = useState<"owner" | "admin" | "member">("owner");

  // 🔹 Project
  const [project, setProject] = useState<any>(null);

  // 🔹 Tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // 🔹 UI States
  const [view, setView] = useState<"grid" | "table">("table");
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // 🔹 Forms
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
  });

  const [inviteData, setInviteData] = useState({
    email: "",
    role: "member",
  });

  // 🔹 Dummy Load
  useEffect(() => {
    API.get(`projects/${id}/`).then(res => setProject(res.data))
    API.get(`projects/${id}/tasks/`).then(res => setTasks(res.data))

    // Dummy Data
    // setProject({
    //   id,
    //   name: "Project Alpha",
    //   description: "This is a sample project",
    // });

    // setTasks([
    //   {
    //     id: 1,
    //     title: "Setup Backend",
    //     description: "Initialize Django project",
    //     status: "progress",
    //     assigned_to: "Ravi",
    //   },
    //   {
    //     id: 2,
    //     title: "Design UI",
    //     description: "Create dashboard UI",
    //     status: "pending",
    //     assigned_to: "Raja",
    //   },
    // ]);
  }, [id]);

  // 🔹 Create Task
  const createTask = async () => {
    await API.post(`projects/${id}/tasks/create/`, taskData)

    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      status: "pending",
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskData({ title: "", description: "" });
    setShowTaskModal(false);
  };

  // 🔹 Delete Task
  const deleteTask = async (taskId: number) => {
    // await API.delete(`tasks/${taskId}/`)

    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // 🔹 Complete Task
  const completeTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: "done" } : t
      )
    );
  };

  // 🔹 Invite User
  const inviteUser = async () => {
    try {
      const res = await API.post(`projects/${id}/invite/`, inviteData);

      console.log(res.data);

      alert("Invitation sent successfully ✅");

      setShowInviteModal(false);
      setInviteData({ email: "", role: "member" });

    } catch (err) {
      console.log(err);
      alert("Error sending invite ❌");
    }
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

  const handleBack = ()=>{
    // navigate(location.state?.from || '/dashboard')
    navigate(-1)
  }

  if (!project) return <p>Loading...</p>;

  return (
    <div className="space-y-6">

      <button className="mb-4 text-blue-600 hover:underline"
      onClick={handleBack}
      >
         ← Back
      </button>

      {/* 🔷 Header */}
      <div className="bg-white p-5 rounded shadow flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">{project.name}</h1>
          <p className="text-gray-600">{project.description}</p>

          <span className="text-xs bg-gray-200 px-2 py-1 rounded mt-2 inline-block">
            Role: {role}
          </span>
        </div>

        {(role === "owner" || role === "admin") && (
          <div className="flex gap-2">
            <button
              onClick={() => setShowInviteModal(true)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
             + Invite
            </button>

            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              + Add Task
            </button>
          </div>
        )}
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

      {/* 🔷 GRID VIEW */}
      {view === "grid" && (
        <div className="grid md:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow">
              <NavLink to={`/dashboard/tasks/${task.id}`} className="font-semibold">{task.title}</NavLink>
              <p className="text-sm text-gray-500 mt-2">
                {task.description}
              </p>

              <p className="text-xs mt-2">
                Assigned: {task.assigned_to || "Unassigned"}
              </p>

              <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${getStatusColor(task.status)}`}>
                {task.status}
              </span>

              {/* Actions */}
              <div className="mt-3 flex justify-between text-sm">
                {(role === "member" || role === 'owner' || role == 'admin') && (
                  <>
                  <button
                    onClick={() => completeTask(task.id)}
                    className="text-green-600"
                  >
                    Complete
                  </button>
                  <NavLink to={`/dashboard/tasks/${task.id}`} className="text-blue-500">View</NavLink>
                  </>
                )}
                {(role === "owner" || role === "admin") && (
                  <>
                    
                    <button className="text-blue-600">Edit</button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}

                
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔷 TABLE VIEW */}
      {view === "table" && (
        <div className="bg-white rounded border border-gray-200 border-[2px] shadow overflow-x-auto">
          <table className="w-full text-center">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Assigned</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="p-3"><NavLink to={`/dashboard/tasks/${task.id}`}>{ task.title }</NavLink></td>
                  <td className="p-3">{task.assigned_to}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>
                  </td>

                  <td className="p-3 space-x-2 flex flex-row gap-1 justify-between px-[1rem]">
                    {(role === "member" || role === 'owner' || role == 'admin' ) && (
                      <>
                      <button
                        onClick={() => completeTask(task.id)}
                        className="text-green-600"
                      >
                        Complete
                      </button>
                      <NavLink to={`/dashboard/tasks/${task.id}`} className="text-blue-500">View</NavLink>
                      </>
                    )}

                    {(role === "owner" || role === "admin" ) && (
                      <>
                        <button className="text-blue-600">Edit</button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-red-600"
                        >
                          Delete
                        </button>
                      </>
                    )}

                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🔷 Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
          onClick={() => setShowTaskModal(false)}
        >
          <div className="bg-white p-6 rounded w-full max-w-md relative"
            onClick={(e)=> e.stopPropagation()}>
            {/* ❌ Close Button */}
            <button
              onClick={() => setShowTaskModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="mb-4 font-semibold">Create Task</h2>

            <input
              placeholder="Title"
              value={taskData.title}
              onChange={(e) =>
                setTaskData({ ...taskData, title: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <textarea
              placeholder="Description"
              value={taskData.description}
              onChange={(e) =>
                setTaskData({ ...taskData, description: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <div className="flex flex-row gap-1">

              <button
                onClick={createTask}
                className="bg-blue-600 text-white px-4 py-2 w-full rounded-lg"
              >
                Create
              </button>
              <button
                onClick={() => setShowTaskModal(false)}
                className="bg-gray-300 px-4 py-2 w-full rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔷 Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
          onClick={()=> setShowInviteModal(false)}
        >
          <div className="bg-white p-6 rounded w-full max-w-md relative"
            onClick={(e)=> e.stopPropagation()}
          >
            <button
              onClick={() => setShowInviteModal(false)}
              className="absolute top-2 right-3 text-gray-600 hover:text-black"
            >
              ✕
            </button>
            <h2 className="mb-4 font-semibold">Invite User</h2>

            <input
              type="email"
              placeholder="Email"
              value={inviteData.email}
              onChange={(e) =>
                setInviteData({ ...inviteData, email: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <select
              value={inviteData.role}
              onChange={(e) =>
                setInviteData({ ...inviteData, role: e.target.value })
              }
              className="border p-2 w-full mb-3"
            >
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
              
            <div className="flex flex-row gap-1">

            <button
              onClick={inviteUser}
              className="bg-green-600 text-white rounded-lg px-4 py-2 w-full"
            >
              Send Invite
            </button>
            <button
              onClick={() => setShowInviteModal(false)}
              className="bg-gray-300 px-4 py-2 w-full rounded-lg"
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}