import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ label, value, onChange, name, autoComplete }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value || ""}
          onChange={onChange}
          name={name}
          autoComplete={autoComplete}
          className="w-full p-2 border rounded pr-10 focus:outline-none focus:ring-2 focus:ring-[#183248]"
        />
        <button
          type="button"
          onClick={() => setShow((prev) => !prev)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

const UserEditCredentials = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) return;

        const res = await axios.get("/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUsername(res.data.username || "");
        setEmail(res.data.email || "");
      } catch (error) {
        console.error("Error fetching user:", error);
        setMessage("Failed to load user data.");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!currentPassword) {
      setMessage("Current password is required.");
      setLoading(false);
      return;
    }

    if (newPassword && newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      setLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
    
      const updatePayload = {
        username: username.trim(),
        email: email.trim(),
        currentPassword,
      };
    
      if (newPassword) {
        updatePayload.newPassword = newPassword.trim();
      }
    
      const res = await axios.put(
        `http://${window.location.hostname}:5000/api/user/update`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
    
      setMessage(res.data.message || "Profile updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    
      // If password was changed, log out the user
      if (newPassword) {
        localStorage.removeItem("userToken"); // Clear the stored token
        navigate("/userlogin"); // Redirect to the login page
      }
    } catch (error) {
      console.error("Update failed:", error);
      const statusCode = error?.response?.status;
    
      if (statusCode === 401) {
        setMessage("Incorrect current password.");
      } else if (statusCode === 404) {
        setMessage("User not found.");
      } else {
        setMessage("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }; 
  return (
    <div className="h-screen bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white overflow-hidden">
      <main className="h-full flex flex-col items-center justify-start overflow-y-auto p-6 md:p-10">
        <button
          onClick={() => navigate(-1)}
          className="self-start text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-3 py-1 rounded-md mb-6 transition"
        >
          ← Back
        </button>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-10" />
        </div>

        <img
          src="/images/blts_logo.png"
          alt="blts-logo"
          className="w-48 md:w-60 mb-6"
        />

        <div className="w-full max-w-md bg-white text-black rounded-xl shadow-lg p-6 space-y-5">
          <h2 className="text-xl font-bold text-center text-[#183248]">User Profile Settings</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#183248]"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#183248]"
                required
              />
            </div>

            <PasswordInput
              label="Current Password"
              value={currentPassword || ""}
              onChange={(e) => setCurrentPassword(e.target.value)}
              name="currentPassword"
              autoComplete="current-password"
            />

            <PasswordInput
              label="New Password (optional)"
              value={newPassword || ""}
              onChange={(e) => setNewPassword(e.target.value)}
              name="newPassword"
              autoComplete="new-password"
            />

            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword || ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              autoComplete="new-password"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#183248] hover:bg-[#2a4c68] text-white p-2 rounded transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>

            {message && (
              <p className={`text-center text-sm ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
};

export default UserEditCredentials;
