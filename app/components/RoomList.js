"use client";
import React, { useCallback } from "react";
import RoomCard from "./RoomCard"; // Assuming you have RoomCard component to display each room
import { useRoomContext } from "../context/roomContext";
import { Blocks } from "react-loader-spinner";

const RoomList = () => {
  const { rooms, loading, error } = useRoomContext();

  const renderRoomCard = useCallback(
    (room) => <RoomCard key={room._id} room={room} />,
    []
  );

  if (loading) {
    return (
      <div className="py-10 !text-center mx-auto w-32">
        <Blocks
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          visible={true}
        />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-14 px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {rooms.map(renderRoomCard)}
      </div>
    </div>
  );
};

export default RoomList;
