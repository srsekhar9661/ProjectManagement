import { useEffect, useState } from "react";
import API from "../../api";


type MsgType = {
  component:string,
  msg:string
}

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const [msg, setMsg] = useState<MsgType>({
    component:'',
    msg:''
  })

  // 🔹 Fetch user
  useEffect(() => {
    API.get("user/me/")
      .then((res) => {
        setUser(res.data);
        setFormData({
          name: res.data.username,
          email: res.data.email,
        });
      })
      .catch(() => console.log("Error fetching user"));
  }, []);

  // 🔹 Handle changes
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: any) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  // 🔹 Save profile
  const handleSave = async () => {
    setLoading(true);
    try {
      await API.put("user/update/", formData);
      setUser({ ...user, ...formData });
      setEditMode(false);
    } catch {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Change password
  const handlePassword = async () => {
    if (passwordData.new !== passwordData.confirm) {
      alert("Passwords do not match");
      return;
    }

    try {
      await API.post("user/change-password/", passwordData);
      // alert("Password updated ✅");
      setMsg({
        component:'passwordUpdate',
        msg:'Password updated ✅'
      })
      setPasswordData({
        current:'',
        new:'',
        confirm:'',
      })
    } catch {
      // alert("Error ❌");
      setMsg({
        component:'passwordUpdate',
        msg:'Error occured while updating password'
      })
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Settings</h1>

      {}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* 🔷 PROFILE CARD */}
        <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl font-bold">
            {user.username[0]}
          </div>

          <h2 className="mt-4 text-lg font-semibold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>

          <button
            onClick={() => setEditMode(!editMode)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {editMode ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* 🔷 DETAILS */}
        <div className="lg:col-span-2 space-y-6">

          {/* 🔹 VIEW MODE */}
          {!editMode && (
            <div className="bg-white p-6 rounded-2xl shadow-lg space-y-3">
              <h2 className="font-semibold text-lg">User Info</h2>

              <p><b>Name:</b> {user.username}</p>
              <p><b>Email:</b> {user.email}</p>
            </div>
          )}

          {/* 🔹 EDIT MODE */}
          {editMode && (
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h2 className="font-semibold mb-4">Edit Profile</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <input name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                <input name="email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <button onClick={() => setEditMode(false)} className="px-4 py-2 bg-gray-300 rounded">
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          )}

          {/* 🔹 PASSWORD */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="font-semibold mb-4">Change Password</h2>

            <div className="grid md:grid-cols-3 gap-4">
              <input type="password" name="current" placeholder="Current" onChange={handlePasswordChange} className="border p-2 rounded" />
              <input type="password" name="new" placeholder="New" onChange={handlePasswordChange} className="border p-2 rounded" />
              <input type="password" name="confirm" placeholder="Confirm" onChange={handlePasswordChange} className="border p-2 rounded" />
            </div>

            <div className="flex justify-end mt-4">
              <button onClick={handlePassword} className="bg-green-600 text-white px-4 py-2 rounded">
                Update Password
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}