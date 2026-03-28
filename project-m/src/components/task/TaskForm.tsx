import { useEffect, useState } from "react";

type Props = {
  initialData?: {
    title: string;
    description: string;
  };
  onSubmit: (data: { title: string; description: string }) => Promise<void>;
  onCancel: () => void;
  isEdit?: boolean;
};

export default function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isEdit = false,
}: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      alert("Title is required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
      if (!isEdit) {
        setFormData({ title: "", description: "" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded w-full max-w-md relative space-y-4">
      <h2 className="text-lg font-semibold">
        {isEdit ? "Edit Task" : "Create Task"}
      </h2>

      <input
        placeholder="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        className="border p-2 w-full rounded"
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        className="border p-2 w-full rounded"
      />

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded"
        >
          {loading
            ? isEdit
              ? "Updating..."
              : "Creating..."
            : isEdit
            ? "Update"
            : "Create"}
        </button>

        <button
          onClick={onCancel}
          className="bg-gray-300 px-4 py-2 w-full rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}