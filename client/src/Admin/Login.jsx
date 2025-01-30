import React, { useState } from "react";
import SummaryApi from "../common";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Login = ({ setNewToken }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      email: data.email,
      password: data.password,
    };
    try {
      const response = await fetch(SummaryApi.Login.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      const textData = await response.text();  // First, get the raw response as text

      const jsonData = textData ? JSON.parse(textData) : [];  // Parse only if data is not empty
    
    
      if (!response.ok) {
        toast.error("Email or Password is not correct"); 
        return; 
      }
      toast.success("Login successful!"); // Show success toast
      localStorage.setItem("user", JSON.stringify(jsonData.user)); // Store user info in localStorage
      console.log("error")
      localStorage.setItem("token", jsonData.token); // Store the token in localStorage
      setNewToken(jsonData.token);  // Update the token in your state
     

      setTimeout(() => {
        navigate("/admin"); // Navigate to the admin page after 2 seconds
      }, 2000);
  
    } catch (error) {
      toast.error("An error occurred during Login."); // Display error if there's a problem with fetch
    }
  };
  
  

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center ">
      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto bg-white rounded shadow-md">
      <Toaster position="top-right" />

        <h2 className="mb-4 text-xl font-semibold">Please Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-xs italic text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              id="password"
              placeholder="Password"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.password && (
              <p className="text-xs italic text-red-500">{errors.password.message}</p>
            )}
          </div>

        
          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="px-8 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              Login
            </button>
          </div>
        </form>

        {/* Register Link */}
        <p className="mt-4 mb-4 text-sm font-medium align-baseline">
          Haven't an account? Please
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            {" "}
            Register{" "}
          </Link>
        </p>
        <p className="mt-4 mb-4 text-sm font-medium align-baseline">
         
          <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
          Forgot password ?
          </Link>
        </p>

        {/* Footer */}
        <p className="mt-5 text-xs text-center text-gray-500">
          @2025 Jooneli. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;