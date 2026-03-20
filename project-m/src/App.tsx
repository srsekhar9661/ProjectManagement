import { useState, useEffect } from "react";
import API from "./api";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Features from "./pages/Features";
import About from "./pages/About";

function App() {

  return (
    <div className="p-10 ">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/features' element={<Features />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}


export default App
