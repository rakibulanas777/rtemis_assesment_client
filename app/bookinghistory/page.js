"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/booking/user/${user?._id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const res = await response.json();

        if (res.success === true) {
          setBookings(res.bookings);
        } else {
          toast.error("Failed to load booking history.");
        }
      } catch (error) {
        console.error("Error fetching booking history:", error);
        toast.error("Failed to load booking history.");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [user]);

  if (loading) return <div className="text-center py-4">Loading...</div>;

  return (
    <div className=" pt-[16vh]">
      <div className="container mx-auto py-6 px-4 sm:px-8 bg-white shadow-lg rounded-lg">
        <ToastContainer />
        <h1 className="text-3xl font-bold mb-6 text-center">Booking History</h1>
        {bookings.length === 0 ? (
          <p className="text-center text-gray-500">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Username
                  </th>
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Room Name
                  </th>
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Start Date
                  </th>
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    End Date
                  </th>
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Rent
                  </th>
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {booking.user.name}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {booking.room.title}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      ${booking.room.rent}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      <button
                        className={`py-1 px-2 rounded font-semibold text-white ${
                          booking.status === "booked"
                            ? "bg-yellow-500"
                            : booking.status === "approved"
                            ? "bg-green-500"
                            : booking.status === "cancelled"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
