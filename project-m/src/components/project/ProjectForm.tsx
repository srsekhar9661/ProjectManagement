import { useEffect, useState } from "react";

type Props = {
  initialData?: {
    name: string;
    description: string;
  };
  onSubmit: (data: { name: string; description: string }) => void;
  onCancel?: () => void;
  isEdit?: boolean;
};

export default function ProjectForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔥 IMPORTANT: preload data when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
      });
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Project name is required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);

      // reset only for create
      if (!isEdit) {
        setFormData({ name: "", description: "" });
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border space-y-4">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Project" : "Create Project"}
      </h2>

      {/* Name */}
      <input
        type="text"
        placeholder="Project Name"
        value={formData.name}
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
      />

      {/* Description */}
      <textarea
        placeholder="Project Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update"
            : "Create"}
        </button>

        {onCancel && (
          <button
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}