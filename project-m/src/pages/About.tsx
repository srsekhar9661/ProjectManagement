export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* 🔷 HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          About Our Project Management Tool
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Simplifying teamwork, enhancing productivity, and delivering results — all in one place.
        </p>
      </section>

      {/* 🔷 MISSION SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Left */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            Our Mission
          </h2>

          <p className="mt-4 text-gray-600">
            Our mission is to empower teams and individuals to manage their work efficiently. 
            We aim to provide a simple yet powerful platform where projects, tasks, and collaboration 
            come together seamlessly.
          </p>

          <p className="mt-4 text-gray-600">
            Whether you're a startup, developer, or enterprise team, our tool helps you stay organized 
            and focused on what truly matters — delivering results.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Mission"
            className="w-72"
          />
        </div>
      </section>

      {/* 🔷 FEATURES / VALUES */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-10">
          What Makes Us Different
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              ⚡ Simple & Fast
            </h3>
            <p className="text-gray-500 mt-3">
              Designed for speed and simplicity so you can focus on your work, not the tool.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              🔒 Secure & Reliable
            </h3>
            <p className="text-gray-500 mt-3">
              Your data is सुरक्षित and always available when you need it.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border text-center">
            <h3 className="text-lg font-semibold text-gray-800">
              🚀 Scalable
            </h3>
            <p className="text-gray-500 mt-3">
              From individuals to large teams, our platform grows with you.
            </p>
          </div>

        </div>
      </section>

      {/* 🔷 TEAM SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Meet the Creator
        </h2>

        <div className="flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Founder"
            className="w-28 h-28 rounded-full"
          />

          <h3 className="mt-4 text-xl font-semibold text-gray-800">
            Raja Sekhar
          </h3>

          <p className="text-gray-500 mt-2 max-w-md">
            A passionate developer focused on building scalable web applications 
            and creating tools that solve real-world problems.
          </p>
        </div>
      </section>

      {/* 🔷 CTA */}
      <section className="bg-blue-600 text-white py-16 text-center mt-10">
        <h2 className="text-3xl font-bold">
          Start managing your projects smarter today
        </h2>

        <p className="mt-3 text-blue-100">
          Join us and experience a better way to collaborate and deliver.
        </p>

        <button className="mt-6 bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition">
          Get Started
        </button>
      </section>

      {/* 🔷 FOOTER */}
      <footer className="text-center text-gray-500 text-sm py-6">
        © ProjectFlow • Built with ❤️ using React & Django
      </footer>

    </div>
  );
}