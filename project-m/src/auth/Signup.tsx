import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    company: "",
  });
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // alert(formData);
    try {
        const res = await API.post('signup/', {
            username: formData.username,
            email:formData.email,
            password:formData.password,
            confirm_password:formData.confirmPassword,
            organization:formData.company
        })

        console.log(res.data)
        alert('Signup successful')

        // navigating to the login
        navigate('/login')

    } catch (error:any) {
        console.log(error.response?.data)

        alert('Error : ' + JSON.stringify(error.response?.data))
        setError('Signup failed')
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10 items-center">
        
        {/* 🔷 LEFT SIDE */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
            Welcome to the Project Management Tool
          </h1>

          <p className="mt-4 text-gray-600">
            Streamline your workflow, collaborate effectively, and stay on top of every project — all in one place. Join us today to make your projects smarter and simpler.
          </p>

          {/* Illustration */}
          <div className="mt-10 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Illustration"
              className="w-72"
            />
          </div>
        </div>

        {/* 🔷 RIGHT SIDE FORM */}
        <div className="bg-white shadow-lg rounded-lg p-8 border">
          <h2 className="text-xl font-semibold text-center mb-6">
            Sign Up
          </h2>
            {error && <p className="text-red-500">{error}</p> }
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Username */}
            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 focus:outline-none"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Company */}
            <div>
              <label className="text-sm text-gray-600">
                Company / Organization Name
              </label>
              <input
                type="text"
                name="company"
                placeholder="Enter your Organization or company name"
                value={formData.company}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
            <div className="text-sm  text-center text-gray-500">Already have an account? <Link to='/login' className="font-bold text-blue-500  hover:underline">Click here to login</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}
