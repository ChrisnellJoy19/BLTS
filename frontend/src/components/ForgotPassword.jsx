import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Optional: Install lucide-react for icons

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user"); // default to user
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Requesting password reset for ${role} with email: ${email}`);
    setSubmitted(true);
  };

  const handleBackToLogin = () => {
    if (role === "admin") {
      navigate("/DilgAdminLogin");
    } else {
      navigate("/UserLogin");
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#889FB1] to-[#587D9D] text-white p-4 flex flex-col items-center justify-center">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          onClick={handleBack}
          className="ml-1 flex items-center gap-1 text-white font-semibold bg-[#183248] hover:bg-[#2a4c68] px-2 py-1 rounded-md transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

        {/* Logo Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-8">
        <img src="/images/dilg_logo.png" alt="dilg-logo" className="h-10" />
          <img src="/images/dilg_marinduque.png" alt="morion-logo" className="h-10" />
          <img src="/images/lgrc_mimaropa.png" alt="lgrc-logo" className="h-10" />
          <img src="/images/one_duque.png" alt="oneduque-logo" className="h-10" />
        </div>

        {/* BLTS Logo */}
        <img
          src="/images/blts_logo.png"
          alt="blts-logo"
          className="w-60 md:w-72 mb-4 mx-auto"
          />

      {/* Form Card */}
      <div className="bg-white text-black p-6 rounded-xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="user"
                  checked={role === "user"}
                  onChange={() => setRole("user")}
                />
                User
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                />
                Admin
              </label>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded"
            />

            <button
              type="submit"
              className="w-full bg-[#183248] hover:bg-[#2a4c68] text-white p-2 rounded hover:bg[-#587D9D] transition"
            >
              Send Reset Link
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="text-green-600 mb-4">
              If an account exists with this email, a reset link has been sent.
            </p>
            <button
              onClick={handleBackToLogin}
              className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            >
              Go Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
