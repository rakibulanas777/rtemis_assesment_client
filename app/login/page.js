import React, { Fragment } from "react";

import logo from "../assets/logo1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
const Login = () => {
  return (
    <Fragment>
      <div className="pt-[10vh]">
        <div className=" h-screen  py-10">
          <form className=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-gray-300/70 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-10">
            <Link href="/">
              <span className="ml-2 text-3xl font-semibold text-[#1E40AF]">
                Homez
              </span>
            </Link>
            <div className="mb-4 mt-4">
              <label
                className="block text-gray-700 font-medium text-sm mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                name="email"
                className=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <Link
              href="/register"
              className=" text-[#2a2723] text-left font-semibold w-full mb-3 rounded"
            >
              Forget Password?
            </Link>
            <button
              className=" bg-[#F59E0B] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-sm px-8 py-2 text-xl font-medium text-white mx-auto text-center"
              type="submit"
            >
              Sign In
            </button>

            <Link
              href="/register"
              className=" text-[#F59E0B] text-center font-semibold w-full mt-3 py-2 px-4 rounded"
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
