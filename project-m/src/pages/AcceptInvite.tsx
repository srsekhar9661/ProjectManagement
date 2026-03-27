import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";

type InviteProp = {
    email : string,
    project_name: string,
    role: string,
    is_accepted: boolean,
}

export default function AcceptInvite() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [invite, setInvite] = useState<InviteProp>();

  // 🔹 Check auth
  const isAuthenticated = !!localStorage.getItem("access");

  useEffect(() => {
    if (!isAuthenticated) {
      // 🔥 Save token and redirect
      localStorage.setItem("invite_token", token);
      navigate(`/login?redirect=invite`);
      return;
    }

    // 🔹 Fetch invite details
    API.get(`invite-details/${token}/`)
      .then(res => setInvite(res.data))
      .catch(() => alert("Invalid invite"));

  }, [token]);

  const handleAccept = async () => {
    try {
      await API.post(`accept-invite/${token}/`);

      alert("Joined project ✅");
      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.error);
    }
  };

  if (!invite) return <p>Loading...</p>;

  return (
    <div className="h-screen w-screen flex justify-center items-center  ">
      <div className="bg-white p-6 rounded-xl shadow border-2 shadow-lg  ">

        <h2 className="text-xl font-bold mb-4 text-center">Project Invitation</h2>

        <hr />

        {/* Invitation script */}
        <section className="my-2 text-center p-2">
            You are invited to join the project, using the mail below
        </section>

        {/* Project detail section */}
        <section className="p-3 border-xl rounded-xl shadow">
            <p><b>Project:</b> {invite.project_name}</p>
            <p><b>Email:</b> {invite.email}</p>
            <p><b>Role:</b> {invite.role}</p>
        </section>

        <div className="flex justify-center">

        <button
          onClick={handleAccept}
          className="bg-blue-600 text-white px-4 py-2 mt-4 "
        >
          Accept & Join
        </button>
        </div>
        <div className="text-smokewhite text-sm my-4">
            <b>Note:</b>
            <p className="text-gray-500 text-sm">You are required to have an account with in this application.</p>

        </div>
      </div>
    </div>
  );
}