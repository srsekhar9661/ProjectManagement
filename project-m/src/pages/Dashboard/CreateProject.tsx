import { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await API.post("projects/create/", formData);
      alert("Project created 🎉");
      navigate("/dashboard/projects");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Create Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Project Name"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}