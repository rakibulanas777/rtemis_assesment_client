"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Register = () => {
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter();

  // Handle form submission
  const handleReset = async (event) => {
    event.preventDefault();
    const form = event.target;
    const otp = form.otp.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Validate password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = {
      otp,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    setLoading(true); // Set loading state to true

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/resetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const res = await response.json();

      if (res.status === "success") {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-[10vh]">
      <div className="py-10">
        <form
          onSubmit={handleReset}
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-gray-300/70 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-10"
        >
          {/* Input fields */}
          <span className="ml-2 text-3xl font-semibold text-[#1E40AF]">
            Reset Password
          </span>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="shadow-sm bg-white border  mt-4 mb-4 rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="text"
            placeholder="Otp"
            name="otp"
            className="shadow-sm bg-white border mb-4 rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />

          <div className="flex gap-3 mb-4 w-full">
            <input
              type="password"
              placeholder="New Password"
              name="password"
              className="shadow-sm bg-white border rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              className="shadow-sm bg-white border rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-[#F59E0B] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-sm px-8 py-2 text-xl font-medium text-white mx-auto text-center"
            disabled={loading}
          >
            {loading ? "Reseting..." : "Reset"}
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;
