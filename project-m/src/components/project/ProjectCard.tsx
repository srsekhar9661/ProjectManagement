import { useNavigate } from "react-router-dom";

type Project = {
    id:number;
    name:string;
    description:string;
}

type Props = {
    project:Project;
    onDelete:(id:number) =>void;
    onEdit:(project:Project)=> void;
}

export default function ProjectCard({ project, onDelete, onEdit }: Props) {
    const navigate = useNavigate();

    return (
        <div className="bg-white p-5 rounded-lg shadow hover:shadow-lg transition">
            <h3 
            onClick={()=> navigate(`/dashboard/projects/${project.id}`)}
            className="text-lg fontr-semibold cursor-pointer hover:text-blue-600">
                {project.name}
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
                {project.description}
            </p>
            <div className="flex justify-between mt-4">
                <button 
                onClick={()=>navigate(`/dashboard/projects/${project.id}`)}
                className="text-blue-600 text-sm">
                View
                </button>
                
                <button
                onClick={() => onEdit(project)}
                className="text-yellow-600 text-sm"
                >
                Edit
                </button>

                <button
                onClick={() => onDelete(project.id)}
                className="text-red-600 text-sm"
                >
                Delete
                </button>
            </div>
        </div>
    )
}