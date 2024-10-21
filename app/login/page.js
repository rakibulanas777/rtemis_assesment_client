"use client";
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserContext } from "../context/userContext";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setReload } = useUserContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    setLoading(true);

    try {
      const response = await fetch(
        "https://rtemis-assesment-server-2.onrender.com/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const res = await response.json();
      console.log(res);

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
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="pt-[10vh]">
        <div className="h-screen py-10">
          <form
            onSubmit={handleLogin}
            className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-gray-300/70 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-10"
          >
            <Link href="/">
              <span className="ml-2 text-3xl font-semibold text-[#1E40AF]">
                Homez
              </span>
            </Link>
            <div className="mb-4 mt-4">
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium text-sm mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="**********"
                name="password"
                className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <Link
              href="/forgetpassword"
              className="text-[#2a2723] text-left font-semibold w-full mb-3 rounded"
            >
              Forgot Password?
            </Link>
            <button
              className="bg-[#F59E0B] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-sm px-8 py-2 text-xl font-medium text-white mx-auto text-center"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <Link
              href="/register"
              className="text-[#F59E0B] text-center font-semibold w-full mt-3 py-2 px-4 rounded"
            >
              Create an Account
            </Link>
            <ToastContainer />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
