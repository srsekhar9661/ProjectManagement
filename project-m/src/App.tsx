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
    <div className="bg-green-500 text-white text-4xl p-10">
      Tailwind Working 🚀
    </div>
  );
}


export default App
