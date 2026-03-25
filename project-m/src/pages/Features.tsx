export default function Features() {
  return (
    <div className="bg-gray-50 w-screen min-h-screen">

      {/* 🔷 HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Powerful Features to Manage Your Projects
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Everything you need to plan, track, and deliver projects efficiently.
        </p>
      </section>

      {/* 🔷 FEATURES GRID */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              📋 Task Management
            </h3>
            <p className="text-gray-500 mt-3">
              Create, assign, and track tasks with ease. Stay organized and never miss deadlines.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              📊 Project Tracking
            </h3>
            <p className="text-gray-500 mt-3">
              Monitor project progress with real-time updates and detailed insights.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              👥 Team Collaboration
            </h3>
            <p className="text-gray-500 mt-3">
              Collaborate with your team, assign roles, and manage permissions efficiently.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              📅 Timeline & Deadlines
            </h3>
            <p className="text-gray-500 mt-3">
              Visualize project timelines and ensure everything stays on track.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              🔔 Notifications
            </h3>
            <p className="text-gray-500 mt-3">
              Get notified about updates, deadlines, and task changes instantly.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              📈 Reports & Analytics
            </h3>
            <p className="text-gray-500 mt-3">
              Gain insights with reports and analytics to improve productivity.
            </p>
          </div>

        </div>
      </section>

      {/* 🔷 CTA SECTION */}
      <section className="bg-blue-600 text-white py-16 text-center">
        <h2 className="text-3xl font-bold">
          Ready to boost your productivity?
        </h2>

        <p className="mt-3 text-blue-100">
          Start managing your projects smarter today.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>

    </div>
  );
}