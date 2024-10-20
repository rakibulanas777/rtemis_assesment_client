"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const RoomDetails = ({ params }) => {
  const { id } = params;
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingDates, setBookingDates] = useState({
    startDate: "",
    endDate: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/rooms/getRoom/${id}`
        );
        const res = await response.json();

        if (res.status === "success") {
          setRoom(res.data.room);
        } else {
          toast.error("Failed to load room details.");
        }
      } catch (err) {
        setError("Failed to load room details.");
        toast.error("Failed to load room details."); // Show error notification
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const { user } = useUserContext();

  const handleBooking = async () => {
    if (!bookingDates.startDate || !bookingDates.endDate) {
      toast.warn("Please select both start and end dates for booking.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          room: id,
          startDate: bookingDates.startDate,
          endDate: bookingDates.endDate,
        }),
      });

      const res = await response.json();

      if (res.status === "success") {
        toast.success("Room booked successfully!"); // Show success notification
        // Optional: Redirect after booking
        // router.push(`/rooms/${id}`);
      } else {
        toast.error(res.message); // Show error notification if booking fails
      }
    } catch (error) {
      console.error("Error booking the room:", error);
      toast.error("Failed to book the room. Please try again."); // Show error notification
    }
  };

  const handleDateChange = (e) => {
    setBookingDates({ ...bookingDates, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-4 px-8 bg-white pt-[20vh]">
      <ToastContainer /> {/* Toast container for notifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 pb-14 gap-8">
        <div>
          <div className="room_images bg-gray-50/[.04] border rounded mb-5 p-4">
            <img
              src={room.picture}
              className="w-full h-[28rem] object-cover"
              alt={room.title}
            />
          </div>
        </div>

        <div className="room-data border rounded p-4 text-black mb-5">
          <div className="text-2xl mb-2 font-semibold text-red-900">
            {room.title}
          </div>
          <div className="text-xl mb-2 font-semibold">
            Rent: <b className="text-red-900">${room.rent}</b>
          </div>
          <div className="text-xl mb-2 font-semibold">
            Facilities:{" "}
            <b className="text-red-900">{room.facilities.join(", ")}</b>
          </div>

          <input
            type="date"
            name="startDate"
            value={bookingDates.startDate}
            onChange={handleDateChange}
            className="mt-2 w-full border rounded p-2"
          />
          <input
            type="date"
            name="endDate"
            value={bookingDates.endDate}
            onChange={handleDateChange}
            className="mt-2 w-full border rounded p-2"
          />

          <button
            onClick={handleBooking}
            className="py-3 px-4 mt-4 bg-red-500 text-white font-medium rounded w-full"
          >
            Book Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
