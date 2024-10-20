/* eslint-disable @next/next/no-img-element */
import React from "react";

import Link from "next/link";
import { FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const RoomCard = ({ room }) => {
  return (
    <div className="card h-full bg-white w-full shadow-sm rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg border p-3">
      <div className="relative mb-3">
        <Link href={`/room/${room._id}`} scroll={false}>
          <motion.img
            whileHover={{ scale: 1.1 }}
            src={room.picture}
            alt={room.title}
            className="w-full h-40 object-cover rounded-md"
          />
        </Link>
        <div className="absolute top-2 right-2">
          <button className="shadow-sm w-10 h-10  text-white bg-red-500 hover:bg-red-700 cursor-pointer p-3 rounded-full relative">
            <FaHeart className="absolute text-xl font-medium top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
          </button>
        </div>
      </div>
      <div className="card-data text-black text-xl">
        <p className="font-semibold text-black">{room?.title}</p>
        <div className="flex items-center text-black justify-between">
          <div>Rent</div>
          <div className="font-medium text-red-500 cursor-pointer">
            ${room?.rent}
          </div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="font-medium">Facilities</div>
          <div className="font-medium">{room?.facilities.join(", ")}</div>
        </div>
        <div className="flex items-center justify-between mt-2">
          <Link href={`/room/${room?._id}`} scroll={false}>
            <button className="bg-[#1C3A9A] text-white rounded px-3 py-1">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
