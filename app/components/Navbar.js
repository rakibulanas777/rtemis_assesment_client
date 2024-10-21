"use client";

import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { useUserContext } from "../context/userContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const { user } = useUserContext();
  console.log(user);

  const navLinks = [
    { name: "Home", href: "/", isProtected: false },
    { name: "Listing", href: "/listing", isProtected: false },
    {
      name: "Booking History",
      href: "/bookinghistory",
      isProtected: true,
      isAdmin: false,
    },
    {
      name: "Add Room",
      href: "/admin/addroom",
      isProtected: true,
      isAdmin: true,
    },
    {
      name: "Booking History (Admin)",
      href: "/admin/bookinghistory",
      isProtected: true,
      isAdmin: true,
    },
  ];

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <header className="fixed w-full bg-[#F3F4F6] shadow-md backdrop-blur-md z-50">
      {/* Top Section */}
      {user?.isVerified === false && (
        <div className="bg-red-600 text-white py-2 text-center">
          <Link href="/verifyOtp">Please verify your account</Link>
        </div>
      )}

      {/* Main Navbar */}
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="ml-2 text-3xl font-semibold text-[#1E40AF]">
            Homez
          </span>
        </Link>

        <nav className="hidden lg:flex space-x-8 items-center">
          {navLinks.map((link, index) => {
            const isAdminLink = link.isAdmin && user?.role === "admin";
            const isProtectedLink = link.isProtected && user;

            return (
              (!link.isProtected || isAdminLink || (!link.isAdmin && user)) && (
                <Link
                  key={index}
                  href={link.href}
                  className="text-[#1E40AF] hover:text-[#1C3A9A] text-lg transition-colors"
                >
                  {link.name}
                </Link>
              )
            );
          })}

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full bg-[#1E40AF] relative">
                  <span className="text-xl font-semibold text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    {user?.name.charAt(0)}
                  </span>
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
              >
                <li>
                  <button
                    onClick={() => {
                      localStorage.clear();
                      location.reload();
                    }}
                    className="text-[#1E293B] font-medium hover:text-[#F59E0B]"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/login">
              <button className=" bg-[#F59E0B] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-[white] hover:bg-[#F59E0B]">
                Login
              </button>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Icon */}
        <div className="block lg:hidden z-40" onClick={handleNav}>
          {nav ? (
            <RxCross2 size={25} className="text-[#1E40AF] cursor-pointer" />
          ) : (
            <TiThMenu size={25} className="text-[#1E40AF] cursor-pointer" />
          )}
        </div>
      </div>

      <div
        className={`lg:hidden absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm backdrop-blur-md bg-white/100 top-0 duration-500 ${
          nav ? "right-0" : "right-[-100%]"
        } pt-24`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, index) => {
            const isAdminLink = link.isAdmin && user?.role === "admin";
            const isProtectedLink = link.isProtected && user;

            return (
              (!link.isProtected || isAdminLink || (!link.isAdmin && user)) && (
                <Link
                  key={index}
                  href={link.href}
                  className="text-[#191919] text-base font-medium hover:text-red-500"
                >
                  {link.name}
                </Link>
              )
            );
          })}
          {user ? (
            <button
              onClick={() => {
                localStorage.clear();
                location.reload();
              }}
              className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white"
            >
              Logout
            </button>
          ) : (
            <Link href="/login">
              <button className="bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
