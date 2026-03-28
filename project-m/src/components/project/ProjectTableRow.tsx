import { useNavigate } from "react-router-dom";

type Project = {
  id: number;
  name: string;
  description: string;
};

type Props = {
  project: Project;
  onDelete: (id: number) => void;
  onEdit: (project: Project) => void;
};

export default function ProjectTableRow({ project, onDelete, onEdit }: Props) {
  const navigate = useNavigate();

  return (
    <tr className="border-t hover:bg-gray-50">
      <td
        className="p-3 cursor-pointer text-blue-600"
        onClick={() => navigate(`/dashboard/projects/${project.id}`)}
      >
        {project.name}
      </td>

      <td className="p-3 text-gray-500">
        {project.description}
      </td>

      <td className="p-3 space-x-3">
        <button
          onClick={() => navigate(`/dashboard/projects/${project.id}`)}
          className="text-blue-600"
        >
          View
        </button>

        <button
          onClick={() => onEdit(project)}
          className="text-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project.id)}
          className="text-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}