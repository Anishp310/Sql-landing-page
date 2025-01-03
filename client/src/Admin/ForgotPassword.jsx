import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    try {
      const response = await fetch("http://localhost:8080/forgotPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      toast.success(result.message);

    } catch (error) {
      toast.error("An error occurred while requesting password reset.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
                  <Toaster position="top-right" />
      
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>
        <p className="text-gray-600 text-center mb-4">Enter your email to reset your password</p>

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
          className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none"
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
