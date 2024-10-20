"use client";

import React, { useState } from "react";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import Image from "next/image"; // Best practice for images in Next.js

const Navbar = () => {
  const [nav, setNav] = useState(false);

  // Example user object
  const user = null;

  const navLinks = [
    { name: "Home", href: "/", isProtected: false },
    { name: "Listing", href: "/menu", isProtected: false },
    { name: "Booking History", href: "/popular", isProtected: true },
    { name: "Add Room", href: "/addfood", isProtected: true },
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

        {/* Desktop Links */}
        <nav className="hidden lg:flex space-x-8 items-center">
          {navLinks.map(
            (link, index) =>
              (!link.isProtected ||
                (link.isProtected && user?.role === "admin")) && (
                <Link
                  key={index}
                  href={link.href}
                  className="text-[#1E40AF] hover:text-[#1C3A9A] text-lg transition-colors"
                >
                  {link.name}
                </Link>
              )
          )}

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="profile" src={user?.profileImage} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
              >
                <li>
                  <Link
                    href="/profile"
                    className="text-[#1E293B] font-medium hover:text-[#F59E0B]"
                  >
                    Profile
                  </Link>
                </li>
                {user?.role === "admin" && (
                  <li>
                    <Link
                      href="/all-order"
                      className="text-[#1E293B] font-medium hover:text-[#F59E0B]"
                    >
                      All Order
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    href="/my-order"
                    className="text-[#1E293B] font-medium hover:text-[#F59E0B]"
                  >
                    My Order
                  </Link>
                </li>
                <li>
                  <a className="text-[#1E293B] font-medium hover:text-[#F59E0B]">
                    Settings
                  </a>
                </li>
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
            <RxCross2 size={25} className="text-[#1E40AF]  cursor-pointer" />
          ) : (
            <TiThMenu size={25} className="text-[#1E40AF]  cursor-pointer" />
          )}
        </div>
      </div>

      <div
        className={`lg:hidden absolute w-1/2 sm:w-2/5 h-screen px-4 py-2 text-xl font-medium ease-in shadow-sm backdrop-blur-md bg-white/100 top-0 duration-500 ${
          nav ? "right-0" : "right-[-100%]"
        } pt-24`}
      >
        <div className="flex flex-col gap-8">
          <a
            href=""
            className="text-[#191919] text-base font-medium hover:text-red-500"
          >
            Today Special
          </a>
          <a
            href=""
            className="text-[#191919] text-base font-medium hover:text-red-500"
          >
            Why foodHunt
          </a>
          <a
            href=""
            className="text-[#191919] text-base font-medium hover:text-red-500"
          >
            Our Menu
          </a>
          <a
            href=""
            className="text-[#191919] text-base font-medium hover:text-red-500"
          >
            Add food
          </a>
          <a
            href=""
            className="text-[#191919] text-base font-medium hover:text-red-500"
          >
            Popular food
          </a>
          <button className=" bg-[#F54748] active:scale-90 transition duration-100 transform hover:shadow-xl shadow-md rounded-full px-8 py-2 text-xl font-medium text-white">
            login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
