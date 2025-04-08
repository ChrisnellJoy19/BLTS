import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserEditCredentials = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the server if needed
    if (localStorage.getItem("userToken")) {
      // User-specific logic (e.g., fetch user data)
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { username, email, password };
    console.log(`Updating user credentials`, updatedData);
    // API call to update user credentials here
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 overflow-auto">
      <main className="flex-1 p-6 md:p-10 bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white relative">
        <button
          onClick={() => navigate(-1)}
          className="ml-1 flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition"
        >
          ← Back
        </button>

        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-8">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-10" />
        </div>

        <img
          src="/images/blts_logo.png"
          alt="blts-logo"
          className="w-60 md:w-72 mb-4 mx-auto"
        />

        <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
          <h2 className="text-xl font-bold text-center">User Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#183248] hover:bg-[#2a4c68] text-white p-2 rounded hover:bg[-#587D9D] transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserEditCredentials;
