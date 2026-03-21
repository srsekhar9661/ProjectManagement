import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api";

type Project = {
  id: number;
  name: string;
  description: string;
  created_at: string;
};

export default function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [error, setError] = useState('')
  

  useEffect(() => {
    API.get(`projects/${id}/`)
      .then((res) => setProject(res.data))
      .catch((err) => {
        console.log(err)
        setError(err)
    });
  }, [id]);

  if (!project) {
    return (
        <div>
            {error && <p>Error : {error}</p> }
            <p>Loading...</p>;
        </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">
        {project.name}
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-6">
        {project.description}
      </p>

      {/* Info Card */}
      <div className="bg-white p-4 rounded shadow max-w-md">
        <p><strong>Project ID:</strong> {project.id}</p>
        <p><strong>Created At:</strong> {new Date(project.created_at).toLocaleString()}</p>
      </div>
    </div>
  );
}