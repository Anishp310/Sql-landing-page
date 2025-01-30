import React, { useState } from "react";
import SummaryApi from "../common";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(SummaryApi.forgotPassword.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        // Redirect to login page after successful request
        setTimeout(() => navigate("/admin"), 2000); // Delay to show toast
      } else {
        toast.error(result.message || "An error occurred.");
      }
    } catch (error) {
      toast.error("An error occurred while requesting password reset.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <Toaster position="top-right" />
      
      <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-2xl font-semibold text-center">Forgot Password</h1>
        <p className="mb-4 text-center text-gray-600">Enter your email to reset your password</p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleForgotPassword}
          className="w-full py-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Request Password Reset
        </button>

        {message && (
          <p
            className={`mt-4 text-center ${
              message.includes("error") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
