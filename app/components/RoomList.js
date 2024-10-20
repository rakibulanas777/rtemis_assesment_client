"use client";
import React, { useCallback } from "react";
import RoomCard from "./RoomCard"; // Assuming you have RoomCard component to display each room
import { useRoomContext } from "../context/roomContext";

const RoomList = () => {
  const { rooms, loading, error } = useRoomContext();

  const renderRoomCard = useCallback(
    (room) => <RoomCard key={room._id} room={room} />,
    []
  );

  if (loading) {
    return <div>Loading rooms...</div>;
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
