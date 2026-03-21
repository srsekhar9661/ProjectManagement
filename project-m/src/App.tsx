import { useState, useEffect } from "react";
import API from "./api";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Features from "./pages/Features";
import About from "./pages/About";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboatdHome";
import Projects from "./pages/Dashboard/Projects";
import CreateProject from "./pages/Dashboard/CreateProject";

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/features' element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path='/dashboard' element={<DashboardLayout />} >
            <Route index element={<DashboardHome />} />
            <Route path='projects' element={<Projects />} />
            <Route path="create" element={<CreateProject />} />
        </Route>
      </Routes>
    </div>
  );
}


export default App
