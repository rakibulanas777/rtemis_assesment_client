"use client";
import React, { Fragment, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter(); // To navigate after successful ForgetPassword

  // Handle form submission
  const handleForgetPassword = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;

    setLoading(true);

    try {
      const response = await fetch(
        "https://rtemis-assesment-server-2.onrender.com/api/v1/users/forgetPassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const res = await response.json();
      // Check if the response is successful
      if (res.status === "success") {
        toast.success(res.message);
        setTimeout(() => {
          router.push("/resetpassword");
        }, 2000);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("ForgetPassword failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <div className="pt-[10vh]">
        <div className="h-screen py-10">
          <form
            onSubmit={handleForgetPassword} // Handle form submission
            className="ease-in duration-300 w-[80%] sm:w-max shadow-sm backdrop-blur-md bg-gray-300/70 lg:w-max mx-auto flex flex-col items-center rounded-md px-8 py-10"
          >
            <Link href="/">
              <span className="ml-2 text-3xl font-semibold text-[#1E40AF]">
                Forget Password
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
                className="shadow-sm bg-white appearance-none border rounded w-full py-3 px-3 sm:w-[20rem] text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required // Make email required
              />
            </div>

            <button
              className="bg-[#F59E0B] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-sm px-8 py-2 text-xl font-medium text-white mx-auto text-center"
              type="submit"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send"} {/* Show loading state */}
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

export default ForgetPassword;
