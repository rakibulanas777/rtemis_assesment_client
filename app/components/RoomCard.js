/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import { FaEdit, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useUserContext } from "../context/userContext";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useRoomContext } from "../context/roomContext";

const RoomCard = ({ room }) => {
  // Accept onDelete as prop
  const { user } = useUserContext();
  const { setReload } = useRoomContext();
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this room?")) {
      try {
        const response = await axios.delete(
          `https://rtemis-assesment-server-2.onrender.com/api/v1/rooms/deleterooms/${room._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.status === "success") {
          toast.success("Room deleted successfully!");
          setReload((prev) => !prev);
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error("Error deleting room:", error);
        toast.error("Failed to delete the room!");
      }
    }
  };

  return (
    <div
      className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg border p-3"
      id="explore"
    >
      <div className="relative mb-3">
        <Link href={`/room/${room._id}`} scroll={false}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={room?.picture}
            alt={room?.title}
            className="w-full h-40 object-cover rounded-md"
          />
        </Link>

        {user?.role === "admin" && (
          <div className="absolute top-2 right-2">
            <button
              onClick={handleDelete} // Call handleDelete on click
              className="shadow-sm text-white bg-red-500 hover:bg-red-700 cursor-pointer p-5 rounded-full relative"
            >
              <MdDelete className=" absolute text-xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
            </button>
          </div>
        )}
        {user?.role !== "admin" && (
          <div className="absolute top-2 right-2">
            <button className="shadow-sm w-10 h-10  text-white bg-red-500 hover:bg-red-700 cursor-pointer p-3 rounded-full relative">
              <FaHeart className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
            </button>
          </div>
        )}
        {user?.role === "admin" && (
          <Link href={`/admin/edit/${room._id}`} scroll={false}>
            <div className="absolute top-2 left-2">
              <button className="shadow-sm w-10 h-10  text-white bg-blue-500 hover:bg-blue-700 cursor-pointer p-3 rounded-full relative">
                <FaEdit className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
              </button>
            </div>
          </Link>
        )}
      </div>
      <div className="card-data text-black text-xl">
        <p className="font-semibold text-black">{room?.title}</p>
        <div className="flex items-center text-black justify-between">
          <div>Rent</div>
          <div className="font-medium text-red-500 cursor-pointer">
            ${room?.rent}
          </div>
        </div>
        <div className="flex items-center text-base justify-between mt-2">
          <div className="font-medium">Facilities</div>
          <div className="font-medium">{room?.facilities[0]}..</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Link href={`/room/${room?._id}`} scroll={false}>
            <button className="bg-[#1C3A9A] text-white rounded px-3 py-1">
              View Details
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RoomCard;
