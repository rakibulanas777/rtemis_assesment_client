import React from "react";
import RoomList from "../components/RoomList";

const Listing = () => {
  return (
    <>
      <div className="container pt-[18vh] pb-8 mx-auto px-8">
        <div className=" !text-center mx-auto pt-6 text-3xl font-semibold text-[#1E40AF]">
          Listing
        </div>
        <RoomList />
      </div>
    </>
  );
};

export default Listing;
