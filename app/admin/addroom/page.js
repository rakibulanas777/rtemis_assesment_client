"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AddRoom = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const rent = form.rent.value;
    const facilities = form.facilities.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("rent", rent);
    formData.append("facilities", JSON.stringify(facilities));
    formData.append("image", image);

    setUploading(true);
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/rooms/addRoom",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(res);
      if (res.data.status === "success") {
        toast.success("Room added successfully!");
        form.reset();
        setImage(null);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Room addition failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="add-room">
      <div className="w-full mx-auto pt-[18vh] pb-10">
        <form
          className="ease-in duration-300 w-[80%] sm:w-[60%] shadow-sm backdrop-blur-md bg-gray-300/80 lg:w-[40rem] mx-auto rounded-md px-8 py-5"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl text-[#1E40AF] font-bold text-center mb-6">
            Add New Room
          </h2>

          <input
            type="text"
            placeholder="Enter room title"
            name="title"
            className="shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            required
          />

          {/* Rent input */}
          <input
            type="number"
            placeholder="Enter rent price"
            name="rent"
            className="shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            step={0.01}
            required
          />

          {/* Facilities input */}
          <textarea
            className="textarea textarea-ghost shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            name="facilities"
            placeholder="Enter facilities (comma-separated)"
            required
          ></textarea>

          {/* Image input */}
          <input
            type="file"
            name="roomImage"
            accept=".jpeg, .png, .jpg"
            className="file-input file-input-bordered bg-[white] text-gray-900 file-input-md w-full mb-4"
            onChange={handleImage}
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            className="bg-[#1E40AF] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add Room"}
          </button>

          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default AddRoom;
