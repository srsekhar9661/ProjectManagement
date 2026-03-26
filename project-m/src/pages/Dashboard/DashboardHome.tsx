import { useEffect, useState } from "react";
import API from "../../api";

export default function DashboardHome() {
  const [user, setUser] = useState<any>(null);
  const [tasksl, setTasksl] = useState([])
  const [projects, setProjects] = useState([])
  const [displayProjects, setDisplayProjects] = useState(false)
  const [displayTasks, setDisplayTasks] = useState(false)
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    completed: 0
  });

  useEffect(() => {
    // 🔹 Get user from backend (optional later)
    // const storedUser = localStorage.getItem("access");
    API.get('get-user-info/')
    .then(res=>{
      console.log(res.data)
      setUser({
        username:res.data.username,
        organization:res.data.email,
      })
    })
    

    // if (storedUser) {
    //   setUser({
    //     username: "User", // replace later with API
    //     organization: "My Organization",
    //   });
    // }

    // 🔹 Fetch projects count
    API.get("projects/")
      .then((res) =>{
        console.log('receiving projects')
        console.log(res.data)
        setStats(prev => ({
          ...prev,
          projects: res.data.length,
        }))
        setProjects(res.data)
      }
      )
      .catch(() => {});

    // 🔹 Fetch tasks count (optional)
    API.get("get-all-tasks/")
    .then(res=>{
      console.log('receing response from get-all-tasks/')
      console.log(res.data)
      setTasksl(res.data)
      setStats(prev => ({...prev, tasks:res.data.length}))
    })
  }, []);

  return (
    <div className="space-y-8 flex-1 overflow-y-auto w-full  ">

      {/* 🔷 Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.username} 👋
        </h1>
        <p className="mt-2 text-blue-100">
          Organization: {user?.organization}
        </p>
      </div>

      {/* 🔷 Stats Section */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded shadow border">
          <h3 className="text-gray-500">Projects</h3>
          <p className="text-2xl font-bold text-blue-600">
            {stats.projects}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h3 className="text-gray-500">Tasks</h3>
          <p className="text-2xl font-bold text-green-600">
            {stats.tasks}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow border">
          <h3 className="text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-purple-600">
            {stats.completed}
          </p>
        </div>

      </div>

      {/* 🔷 Quick Actions */}
      <div className="bg-white p-6 rounded shadow border">
        <h2 className="text-lg font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create Project
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            + Add Task
          </button>
        </div>
      </div>

      {/* 🔷 Recent Projects */}
      <div className="bg-white p-6 rounded shadow border">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold mb-4">Recent Projects</h2>
          <button
          onClick={()=>setDisplayProjects(!displayProjects)}
           className="px-2 border rounded-lg shadow font-bold text-2xl"
           >{ displayProjects ? '-' : '+' }</button>
        </div>
        { displayProjects &&
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border text-left">Name</th>
                  <th className="p-3 border text-left">Status</th>
                  <th className="p-3 border text-left">Created</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.length > 0 ? (
                  projects.slice(0, 5).map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{index + 1}</td>

                      <td className="p-3 border font-medium">
                        {item.name}
                      </td>

                      {/* 🔹 Status Badge */}
                      <td className="p-3 border">
                        <span className={`px-2 py-1 text-xs rounded-full 
                          ${item.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                          }`}>
                          {item.status || "Pending"}
                        </span>
                      </td>

                      <td className="p-3 border">
                        {item.created_at
                          ? new Date(item.created_at).toLocaleDateString()
                          : "-"}
                      </td>

                      {/* 🔹 Actions */}
                      <td className="p-3 border text-center flex gap-2 justify-between space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                          View
                        </button>

                        <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                          Edit
                        </button>

                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No projects available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>

      {/* 🔷 Recent Tasks */}
      <div className="bg-white p-6 rounded shadow border">
        <div className="flex justify-between mb-2">
          <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
          <button
          onClick={()=>setDisplayTasks(!displayTasks)}
           className="px-2 border rounded-lg shadow font-bold text-2xl"
           >{ displayTasks ? '-' : '+' }</button>
        </div>
        { displayTasks &&  
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 border">#</th>
                  <th className="p-3 border text-left">Title</th>
                  <th className="p-3 border text-left">Priority</th>
                  <th className="p-3 border text-left">Status</th>
                  <th className="p-3 border text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {tasksl.length > 0 ? (
                  tasksl.slice(0, 5).map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 border">{index + 1}</td>

                      <td className="p-3 border font-medium">
                        {item.title}
                      </td>

                      {/* 🔹 Priority */}
                      <td className="p-3 border">
                        <span className={`px-2 py-1 text-xs rounded-full 
                          ${item.priority === "high"
                            ? "bg-red-100 text-red-600"
                            : item.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                          }`}>
                          {item.priority || "Low"}
                        </span>
                      </td>

                      {/* 🔹 Status */}
                      <td className="p-3 border">
                        <span className={`px-2 py-1 text-xs rounded-full 
                          ${item.completed
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-600"
                          }`}>
                          {item.completed ? "Completed" : "Pending"}
                        </span>
                      </td>

                      {/* 🔹 Actions */}
                      <td className="p-3 border text-center flex gap-2 justify-between space-x-2">
                        <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                          View
                        </button>

                        <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600">
                          Edit
                        </button>

                        <button className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-gray-500">
                      No tasks available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        }
      </div>

    </div>
  );
}