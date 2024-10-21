"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserContext } from "../context/userContext";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setReload } = useUserContext();
  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const userData = {
      fullName,
      email,
      password,
      passwordConfirm: confirmPassword,
    };

    setLoading(true);

    try {
      const response = await fetch(
        "https://rtemis-assesment-server-2.onrender.com/api/v1/users/signup",
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
        localStorage.setItem("token", res.token);
        toast.success(res.message);

        setTimeout(() => {
          setReload((prev) => !prev);
          router.push("/");
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
          onSubmit={handleRegister}
          className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-gray-300/70 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-10"
        >
          <span className="ml-2 text-3xl font-semibold text-[#1E40AF]">
            Sign Up
          </span>
          <input
            type="text"
            placeholder="Enter your name"
            name="fullName"
            className="shadow-sm bg-white border mt-4 mb-4 rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className="shadow-sm bg-white border mb-4 rounded w-full py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />
          <div className="flex gap-3 mb-4 w-full">
            <input
              type="password"
              placeholder="Password"
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
          <button
            type="submit"
            className="bg-[#F59E0B] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-sm px-8 py-2 text-xl font-medium text-white mx-auto text-center"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Register"}
          </button>
          <Link
            href="/login"
            className="text-[#F59E0B] text-center font-semibold w-full mt-3 py-2 px-4 rounded"
          >
            Already have an account? Login
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;
