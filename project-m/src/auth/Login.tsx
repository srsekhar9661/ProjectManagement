import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await API.post("token/", {
        username: formData.username,
        password: formData.password,
        });

        // store tokens
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        // alert("Login successful 🎉");

        // check invite token from the localStorage
        const inviteToken = localStorage.getItem('invite_token')
        if ( inviteToken){
          localStorage.removeItem('invite_token')
          navigate(`/accept-invite/${inviteToken}`)
        } else {
          navigate('/dashboard')
        }
        

    } catch (err) {
        alert("Invalid credentials ❌");
    }
    };

  return (
    <div className="h-screen w-screen bg-gray-50 flex items-center justify-center px-6">
      
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* 🔷 LEFT SIDE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Welcome Back 👋
          </h1>

          <p className="mt-4 text-gray-600">
            Login to continue managing your projects, track tasks, and collaborate with your team efficiently.
          </p>

          {/* Illustration */}
          <div className="mt-10 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/942/942748.png"
              alt="Login Illustration"
              className="w-72"
            />
          </div>
        </div>

        {/* 🔷 RIGHT SIDE FORM */}
        <div className="bg-white shadow-lg rounded-lg p-8 border">
          <h2 className="text-xl font-semibold text-center mb-6">
            Login
          </h2>
          {error && <p className="text-red-500 text-center">{error}</p> }

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Remember + Forgot */}
            {/* <div className="flex justify-between items-center text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="text-blue-600 cursor-pointer hover:underline">
                Forgot Password?
              </span>
            </div> */}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            {/* Signup Redirect */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to='/signup' className="text-blue-600 cursor-pointer hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}