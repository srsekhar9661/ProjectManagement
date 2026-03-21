import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
//   const user = JSON.parse(localStorage.getItem('user') || '')
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/login");
        };

  const baseClass = "text-white cursor-pointer";
  const activeClass = "underline underline-offset-4 font-semibold";

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-blue-600 px-6 py-4 flex justify-between items-center z-50 shadow-md mb-lg-5">
        <h1 className="text-white text-xl font-semibold">
          Project Management
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          <NavLink
          to="/"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/features"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          Features
        </NavLink>
        
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${baseClass} ${isActive ? activeClass : ""}`
          }
        >
          About
        </NavLink>

          {user ?  
          <>
          <NavLink 
          to='/dashboard'
          className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
            }
          >
            Dashboard
          </NavLink>
          <li onClick={handleLogout} className="cursor-pointer hover:text-whitesmoke hover:rounded hover:px-1 hover:bg-gray-100">
            Logout
            </li>
          </>
          :
          <>
            <NavLink
            to="/signup"
            className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
            }
            >
            Signup
            </NavLink>

            <NavLink
            to="/login"
            className={({ isActive }) =>
                `${baseClass} ${isActive ? activeClass : ""}`
            }
            >
            Login
            </NavLink>
          </>
          }

        </ul>

        {/* Mobile Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </button>
      </nav>

      {/* Overlay (background dim) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Right Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-blue-600 p-6 z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close Button */}
        <span className="flex justify-end">

        <button
          className="text-white text-xl mb-6 "
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
        </span>

        {/* Menu Items */}
        <ul className="flex flex-col gap-4">
          <li className="text-white">Home</li>
          <li className="text-white">About</li>
          <li className="text-white">Login</li>
          <li className="text-white">Signup</li>
          <li className="text-white">Logout</li>
        </ul>
      </div>
    </>
  );
}