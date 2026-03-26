import { useState } from "react";

export default function Settings() {
  const [profileImage, setProfileImage] = useState(null);

  const [formData, setFormData] = useState({
    name: "Raja Sekhar",
    email: "raja@email.com",
    phone: "",
    bio: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated:", formData);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-100">
      
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* 🔹 LEFT: PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center text-center">
          
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                profileImage ||
                "https://via.placeholder.com/120"
              }
              alt="profile"
              className="w-28 h-28 rounded-full object-cover border-4 border-blue-500"
            />

            <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer text-xs">
              ✎
              <input
                type="file"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <h2 className="mt-4 text-lg font-semibold">{formData.name}</h2>
          <p className="text-gray-500 text-sm">{formData.email}</p>

          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
            Logout
          </button>
        </div>

        {/* 🔹 RIGHT: SETTINGS FORMS */}
        <div className="lg:col-span-2 space-y-6">

          {/* Personal Info */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border p-2 rounded-md"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded-md"
              />

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-2 rounded-md"
              />

              <input
                type="text"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
                className="border p-2 rounded-md md:col-span-2"
              />
            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                Save Changes
              </button>
            </div>
          </form>

          {/* Password */}
          <form className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <input
                type="password"
                name="password"
                placeholder="Current Password"
                className="border p-2 rounded-md"
              />

              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                className="border p-2 rounded-md"
              />

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="border p-2 rounded-md"
              />

            </div>

            <div className="flex justify-end mt-4">
              <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700">
                Update Password
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}