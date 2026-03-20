import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center bg-blue-500 p-4">
        <h1 className="text-white text-xl font-semibold">
          Project Management
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4">
          <li className="text-white">Home</li>
          <li className="text-white">About</li>
          <li className="text-white">Login</li>
          <li className="text-white">Signup</li>
          <li className="text-white">Logout</li>
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