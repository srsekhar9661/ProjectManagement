import { useState, useEffect } from "react";
import API from "./api";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Signup from "./auth/Signup";
import Login from "./auth/Login";
import Features from "./pages/Features";
import About from "./pages/About";
import DashboardLayout from "./pages/Dashboard/DashboardLayout";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import Projects from "./pages/Dashboard/Projects";
import CreateProject from "./pages/Dashboard/CreateProject";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectDetails from "./pages/Dashboard/ProjectDetails";
import Settings from "./pages/Dashboard/Settings";
import Collaboration from "./pages/Dashboard/Collaboration";
import TaskDetails from "./pages/Dashboard/TaskDetail";

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
        <Route path='/dashboard' element={
          <ProtectedRoute >
            <DashboardLayout />
          </ProtectedRoute>
          } >
            <Route index element={<DashboardHome />} />
            <Route path='projects' element={<Projects />} />
            <Route path="create" element={<CreateProject />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path='settings' element={<Settings />} />
            <Route path="collaboration" element={<Collaboration />} />
            <Route path="tasks/:taskId" element={<TaskDetails />} />
        </Route>
      </Routes>
    </div>
  );
}


export default App
