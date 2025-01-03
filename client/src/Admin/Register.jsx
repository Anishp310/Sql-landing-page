import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";

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
    const response = await fetch("http://localhost:8080/register", {
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

      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Please Register</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              {...register("name", { required: "Username is required" })}
              type="text"
              id="name"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.name && (
              <p className="text-red-500 text-xs italic mb-3">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              id="email"
              placeholder="Email Address"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mb-3">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
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
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mb-3">
                {errors.password.message}
              </p>
            )}
          </div>

         
          {/* Register Button */}
          <div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white px-8 py-2 rounded font-bold focus:outline-none"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="align-baseline font-medium mt-4 mb-4 text-sm">
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
            className="flex w-full justify-center bg-blue-500 hover:bg-blue-700 text-white items-center font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div> */}

        {/* Footer */}
        <p className="mt-5 text-center text-gray-500 text-xs">
          @2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
