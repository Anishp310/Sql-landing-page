import React, { useState } from "react";
import SummaryApi from "../common";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const navigate = useNavigate()


const onSubmit = async (data) => {
  // Map the form data to match backend field names
  const payload = {
    username: data.name, // Map "name" to "username"
    email: data.email,
    password: data.password,
  };

  try {
    const response = await fetch(SummaryApi.Register.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      toast.error(result.message); // Display error message from backend
      return;
    }

    toast.success("Registration successful!");
    navigate("/admin");
  } catch (error) {
    toast.error(error.message);
  }
};


//   const handleGoogleSignIn = () => {
//     console.log("Google Sign-In triggered");
//     // Simulating Google sign-in action
//     setMessage("Google sign-in triggered.");
//   };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
            <Toaster position="top-right" />

      <div className="w-full max-w-sm px-8 pt-6 pb-8 mx-auto bg-white rounded shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Username
            </label>
            <input
              {...register("name", { required: "Username is required" })}
              type="text"
              id="name"
              placeholder="Username"
              className="w-full px-3 py-2 leading-tight border rounded shadow appearance-none focus:outline-none focus:shadow"
            />
            {errors.name && (
              <p className="mb-3 text-xs italic text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

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
              <p className="mb-3 text-xs italic text-red-500">
                {errors.email.message}
              </p>
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
              <p className="mb-3 text-xs italic text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

         
          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="px-8 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="mt-4 mb-4 text-sm font-medium align-baseline">
          Already have an account? Please
          <Link to="/admin" className="text-blue-500 hover:text-blue-700">
            {" "}
            Login{" "}
          </Link>
        </p>

        {/* Google Sign-In Button */}
        {/* <div>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div> */}

        {/* Footer */}
        <p className="mt-5 text-xs text-center text-gray-500">
          @2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
