import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  name: string;
};

type Props = {
  projects?: Project[];
};

export default function HomePage({ projects = [] }: Props) {
    const storedUser = localStorage.getItem('user')
    const user = storedUser ? JSON.parse(storedUser) : null

    const navigate = useNavigate()


    const handleSignIn = () => {
        navigate('/login')
    }
    
  return (
    <div className="bg-gray-50 h-full w-screen flex-1 overflow-y-auto">
      
      {/* 🔷 HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <div>
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Ship projects faster. Stay on track.
          </h1>

          <p className="mt-4 text-gray-600 text-lg">
            Collaborate with your team, track tasks, and visualize progress —
            all from a single workspace.
          </p>

            {!user && 
            
          <button onClick={handleSignIn} className="my-3 px-6 py-3 border border-gray-400 rounded-md text-gray-700 hover:bg-gray-100">
            Sign In
          </button>
            }

          <div className="flex gap-6 mt-6 text-sm text-gray-500">
            <span>Team collaboration</span>
            <span>Kanban & Scrum boards</span>
            <span>Progress & reports</span>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white shadow-md rounded-lg p-6 border">
          <h3 className="text-lg font-semibold text-gray-800">
            Quick Overview
          </h3>

          <p className="text-gray-500 mt-2">
            Active organization: <span className="italic">Personal Workspace</span>
          </p>

          <div className="flex gap-2 mt-4">
            <button className="border px-3 py-1 rounded text-blue-600 border-blue-500">
              My Tasks
            </button>
            <button className="border px-3 py-1 rounded text-blue-600 border-blue-500">
              Boards
            </button>
            <button className="border px-3 py-1 rounded text-blue-600 border-blue-500">
              Timeline
            </button>
          </div>

          <div className="border-t mt-4 pt-4 text-gray-600">
            <div className="flex justify-between">
              <span>Open Tasks</span>
              <span>0</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Active Projects</span>
              <span>{projects.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🔷 FEATURES SECTION */}
      <section className="max-w-7xl bg-white mx-auto px-6 py-10">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
          What You Can Do
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="font-semibold text-lg text-gray-800">
              Boards & Workflows
            </h3>
            <p className="text-gray-500 mt-2">
              Create Kanban boards, customize columns, and automate transitions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="font-semibold text-lg text-gray-800">
              Timeline & Gantt
            </h3>
            <p className="text-gray-500 mt-2">
              Plan sprints, view dependencies, and manage timelines effortlessly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="font-semibold text-lg text-gray-800">
              Team & Permissions
            </h3>
            <p className="text-gray-500 mt-2">
              Invite members, assign roles, and control access at the project level.
            </p>
          </div>
        </div>
      </section>

      {/* 🔷 RECENT PROJECTS */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Recent Projects
          </h3>
          <span className="text-blue-600 text-sm cursor-pointer">
            See all projects
          </span>
        </div>

        <div className="mt-10 text-center">
          {projects.length === 0 ? (
            <>
              <p className="text-gray-500">
                No projects yet — ready to create your first project?
              </p>
              <button className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700">
                Create Project
              </button>
            </>
          ) : (
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-4 rounded shadow border text-left"
                >
                  <h4 className="font-semibold text-gray-800">{p.name}</h4>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 🔷 CTA SECTION */}
      <section className="bg-blue-600 text-white py-16 text-center mt-10">
        <h2 className="text-3xl font-bold">
          Build better projects. Deliver on time.
        </h2>
        <p className="mt-3 text-blue-100">
          Start a free workspace for your team and try timelines, boards, and reports today.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-md font-medium">
          Sign Up Free
        </button>
      </section>

      {/* 🔷 FOOTER */}
      <footer className="text-center text-gray-500 text-sm py-6">
        © ProjectFlow • Terms • Privacy
      </footer>
    </div>
  );
}