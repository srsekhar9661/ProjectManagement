import { useState, useEffect } from "react";
import API from "./api";

function App() {
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    API.get('projects/')
    .then((res) =>{
      setProjects(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])
  return (
    <div className="p-10">
      <div className="bg-red-500 text-white text-3xl p-10">
      Tailwind Test
    </div>
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      {projects.map((p:any)=>(
        <div key={p.id} className="p-4 mb-2 bg-gray-800 text-white rounded">
          {p.name}
        </div>
      ))}
    </div>
  );
}


export default App
