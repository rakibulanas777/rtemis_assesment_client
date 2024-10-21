"use client";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRoomContext } from "@/app/context/roomContext";

const EditRoom = ({ params }) => {
  const { id } = params;
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { setReload } = useRoomContext();
  const [roomData, setRoomData] = useState({
    title: "",
    rent: "",
    facilities: [],
    details: "",
    location: "",
  });

  // Fetch room data when the component mounts
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const res = await axios.get(
          `https://rtemis-assesment-server-2.onrender.com/api/v1/rooms/getRoom/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const room = res.data.data.room; // Adjust this based on your API response structure
        setRoomData({
          title: room.title,
          rent: room.rent,
          facilities: room.facilities, // Assuming this is an array
          details: room.details,
          location: room.location,
        });
      } catch (error) {
        console.error("Failed to fetch room data:", error);
        toast.error("Failed to fetch room data!");
      }
    };

    fetchRoomData();
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const rent = form.rent.value;
    const facilities = Array.from(form.facilities.selectedOptions).map(
      (option) => option.value
    );
    const details = form.details.value;
    const location = form.location.value;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("rent", rent);

    // Append each facility to FormData
    facilities.forEach((facility) => {
      formData.append("facilities", facility);
    });

    formData.append("details", details);
    formData.append("location", location);
    if (image) {
      formData.append("image", image); // Only append if an image is selected
    }

    setUploading(true);
    try {
      const res = await axios.patch(
        `https://rtemis-assesment-server-2.onrender.com/api/v1/rooms/editrooms/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.status === "success") {
        toast.success("Room updated successfully!");
        setReload((prev) => !prev);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Room update failed!");
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
            Edit Room
          </h2>

          <input
            type="text"
            placeholder="Enter room title"
            name="title"
            className="shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            required
            value={roomData.title}
            onChange={(e) =>
              setRoomData({ ...roomData, title: e.target.value })
            }
          />

          <input
            type="number"
            placeholder="Enter rent price"
            name="rent"
            className="shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            step={0.01}
            required
            value={roomData.rent}
            onChange={(e) => setRoomData({ ...roomData, rent: e.target.value })}
          />

          <label className="block text-gray-700 text-sm font-bold mb-2">
            Facilities (hold Ctrl to select multiple):
          </label>
          <select
            name="facilities"
            className="shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            multiple
            required
            defaultValue={roomData.facilities} // Set selected options
          >
            <option value="Wi-Fi">Wi-Fi</option>
            <option value="Air Conditioning">Air Conditioning</option>
            <option value="Swimming Pool">Swimming Pool</option>
            <option value="Gym">Gym</option>
            <option value="Parking">Parking</option>
          </select>

          <textarea
            className="textarea textarea-ghost shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            name="details"
            placeholder="Enter room details"
            required
            value={roomData.details}
            onChange={(e) =>
              setRoomData({ ...roomData, details: e.target.value })
            }
          ></textarea>

          <input
            type="text"
            placeholder="Enter location"
            name="location"
            className="shadow-sm bg-white border rounded w-full py-3 px-3 mb-4 text-gray-700 focus:outline-none focus:shadow-outline"
            required
            value={roomData.location}
            onChange={(e) =>
              setRoomData({ ...roomData, location: e.target.value })
            }
          />

          <input
            type="file"
            name="roomImage"
            accept=".jpeg, .png, .jpg"
            className="file-input file-input-bordered bg-[white] text-gray-900 file-input-md w-full mb-4"
            onChange={handleImage}
          />

          <button
            type="submit"
            className="bg-[#1E40AF] active:scale-90 transition duration-150 transform hover:shadow-xl shadow-md w-full rounded-full px-8 py-2 text-xl font-medium text-white mx-auto text-center mb-3 mt-5"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Update Room"}
          </button>

          <ToastContainer position="bottom-right" />
        </form>
      </div>
    </div>
  );
};

export default EditRoom;
