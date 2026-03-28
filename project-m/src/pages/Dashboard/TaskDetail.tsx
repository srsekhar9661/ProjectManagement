import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import TaskForm from "../../components/task/TaskForm";

export default function TaskDetails() {
    const { taskId } = useParams();

    const [task, setTask] = useState(null);
    const [comment, setComment] = useState("");
    const [file, setFile] = useState(null);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [hideComments, setHideComments] = useState(true)
    const [hideAttachments, setHideAttachments] = useState(true)
    const [editing, setEditing] = useState(false);


    const handleComplete = async () => {
      try {
        await API.patch(`/tasks/${taskId}/complete/`);

        setTask((prev: any) => ({
          ...prev,
          status: "done"
        }));
      } catch (err) {
        console.log(err);
      }
    };


    const handleDelete = async () => {
        if (!confirm("Delete this task?")) return;

        try {
          await API.delete(`/tasks/${taskId}/delete/`);
          navigate(-1); // go back
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        const fetchTask = async () => {
        try {
            console.log('ohdfgoashd')
            setLoading(true);

            const response = await API.get(`/get-task-detail/${taskId}/`);
            console.log(response.daa)
            setTask(response.data);

            console.log(`original : ${JSON.stringify(response.data)}`)
        } catch (err) {
            console.error(err);
            setError("Failed to load task");
        } finally {
            setLoading(false);
        }
        };

        fetchTask();
    }, [taskId]);

  if (!task) return <div className="p-6">Loading...</div>;

  // 🔹 Add Comment
  const addComment = async () => {
    if (!comment) return;

    try {
        const response = await API.post(`/tasks/${taskId}/add-comment/`, {
            content:comment
        })
        console.log(`Data retrieved fromt eh bakcend : ${JSON.stringify(response.data)}`)
        console.log(`before updating : ${JSON.stringify(task)}`)
        setTask({
            ...task,
            comments:[...task.comments, response.data]
        })
        console.log(`after updating : ${JSON.stringify(task)}`)

        setComment('')
    } catch (err) {
        console.log(err)
    }

    
  };

  // 🔹 Add File
  const handleFileUpload = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await API.post(
          `/tasks/${taskId}/upload/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setTask((prev: any) => ({
          ...prev,
          attachments: [...prev.attachments, res.data]
        }));

        setFile(null);
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="h-full overflow-y-auto p-6 bg-gray-100">
        <button
            onClick={() => navigate(-1)}
            className="mb-4 text-blue-600 hover:underline"
        >
            ← Back
        </button>

        <h1 className="text-2xl font-bold mb-6">Task Details</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {editing && (
          <div
            className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
            onClick={() => setEditing(false)}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <TaskForm
                initialData={{
                  title: task.title,
                  description: task.description
                }}
                isEdit
                onSubmit={async (data) => {
                  const res = await API.put(
                    `/tasks/${taskId}/update/`,
                    data
                  );

                  setTask((prev: any) => ({
                    ...prev,
                    ...res.data
                  }));

                  setEditing(false);
                }}
                onCancel={() => setEditing(false)}
              />
            </div>
          </div>
        )}

        {/* 🔹 LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Task Info */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold mb-3">{task.title}</h1>
            <p className="text-gray-600">{task.description}</p>
          </div>

          {/* Comments */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <div className="w-full relative">

                <h2 className="text-lg font-semibold mb-4">Comments</h2>
                <span className="absolute top-1 right-1 transition-smooth  hover:cursor-pointer hover:bg-black hover:text-white p-2 rounded-xl" 
                    onClick={()=>setHideComments(!hideComments)}
                >{ hideComments ? '🔽' : '🔼' }</span>
            </div>

            {
                !hideComments && 
            <>
                <div className="space-y-3 my-4">
                    {task.comments.map((c) => (
                        <div key={c.id} className="border p-3 rounded-md">
                        <div className="flex justify-between text-sm">
                            <span className="font-medium">{c.user.username}</span>
                            <span className="text-gray-400">{c.time}</span>
                        </div>
                        <p className="text-gray-600">{c.content}</p>
                        </div>
                    ))}
                </div>
                
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="flex-1 border p-2 rounded-md"
                    />

                    <button
                        onClick={addComment}
                        className="bg-blue-600 text-white px-4 rounded-md"
                    >
                        Send
                    </button>
                </div>
            </>
            
            }

          </div>

          {/* Attachments */}
          {/* <div className="bg-white p-6 rounded-2xl shadow">
            <div className="relative">
                  <h2 className="text-lg font-semibold mb-4">Attachments</h2>
                  <span className="absolute top-1 right-1 transition-smooth  hover:cursor-pointer hover:bg-black hover:text-white p-2 rounded-xl" 
                    onClick={()=>setHideAttachments(!hideAttachments)}
                     >{ !hideAttachments ? '🔽' : '🔼' }</span>
            </div>

            { hideAttachments && <>
            
              <div className="space-y-2 mb-4">
                {task.attachments.map((file) => (
                  <div
                    key={file.id}
                    className="border p-2 rounded-md text-sm"
                  >
                    📄 <a
                        href={file.file}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        📄 {file.file.split('/').pop()}
                      </a>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="border p-1 rounded-md"
                />

                <button
                  onClick={handleFileUpload}
                  className="bg-green-600 text-white px-4 rounded-md"
                >
                  Upload
                </button>
              </div>
            </>}
          </div> */}

        </div>

        {/* 🔹 RIGHT SIDE */}
        <div className="space-y-6">

          {/* Details */}
          <div className="bg-white p-6 rounded-2xl shadow space-y-3">
            <h2 className="text-lg font-semibold">Details</h2>

            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Due:</strong> {task.dueDate}</p>
            <p><strong>Assignee:</strong> {task.assignee}</p>
          </div>

          {/* Actions */}
          <div className="bg-white p-6 rounded-2xl shadow">
            
            <button
              onClick={handleComplete}
              disabled={task.status === "done"}
              className="w-full mt-3 bg-green-600 text-white py-2 rounded-lg disabled:bg-gray-400"
            >
              Complete Task
            </button>

            <button
             onClick={() => setEditing(true)}
            className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
              Edit Task
            </button>

            <button
            onClick={handleDelete}
            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
              Delete Task
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}