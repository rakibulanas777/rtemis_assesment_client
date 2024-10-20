import React, { Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import avater from "../assets/profile.png";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
  return (
    <div className="pt-[10vh]">
      <div className="py-10">
        <form className=" ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-gray-300/70 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-10">
          <label htmlFor="file-upload" className="custom-file-upload">
            <Image
              src={avater}
              className="cursor-pointer mx-auto"
              width={110}
              height={110}
              alt="profile"
            />
          </label>
          <label className="block text-center font-medium text-gray-900 text-base mb-2">
            Profile Picture
          </label>
          <input
            type="file"
            label="Image"
            name="myFile"
            id="file-upload"
            className="hidden"
            accept=" .jpeg, .png, .jpg"
          />

          <input
            type="text"
            placeholder="Enter your name"
            name="fullName"
            className=" shadow-sm bg-white appearance-none border mt-4 mb-4 rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            className=" shadow-sm bg-white appearance-none border mb-4 rounded w-full  py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />

          <div className="flex gap-3 mb-4 items-center">
            <input
              type="password"
              placeholder="**********"
              name="password"
              className=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <input
              type="password"
              placeholder="**********"
              name="password"
              className=" shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            className=" bg-[#F59E0B] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-sm px-8 py-2 text-xl font-medium text-white mx-auto text-center"
            type="submit"
          >
            Register
          </button>

          <Link
            href="/login"
            className=" text-[#F59E0B] text-center font-semibold w-full mt-3 py-2 px-4 rounded"
          >
            Already Account
          </Link>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Register;
