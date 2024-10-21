"use client";

import { useEffect, useState } from "react";
import { useUserContext } from "@/app/context/userContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Blocks } from "react-loader-spinner";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `https://rtemis-assesment-server-2.onrender.com/api/v1/booking/all-booking`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const res = await response.json();

        console.log(res);
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

  const handleApprove = async (bookingId) => {
    try {
      const response = await fetch(
        `https://rtemis-assesment-server-2.onrender.com/api/v1/booking/${bookingId}/approve`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      console.log(res);
      if (res.success) {
        toast.success("Booking approved successfully!");
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: "approved" }
              : booking
          )
        );
      } else {
        toast.error("Failed to approve booking.");
      }
    } catch (error) {
      console.error("Error approving booking:", error);
      toast.error("Failed to approve booking.");
    }
  };

  const handleCancel = async (bookingId) => {
    try {
      const response = await fetch(
        `https://rtemis-assesment-server-2.onrender.com/api/v1/booking/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();

      if (res.success) {
        toast.success("Booking cancelled successfully!");
        setBookings((prev) =>
          prev.filter((booking) => booking._id !== bookingId)
        );
      } else {
        toast.error("Failed to cancel booking.");
      }
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking.");
    }
  };

  if (loading)
    return (
      <div className=" h-screen">
        <div className="text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto w-32">
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
      </div>
    );

  return (
    <div className="pt-[16vh]">
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
                  <th className="border-b py-3 px-4 text-left text-sm font-medium text-gray-600">
                    Actions
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
                      {booking.user?.name}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {booking.room?.title}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {new Date(booking.startDate).toLocaleDateString()}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      {new Date(booking.endDate).toLocaleDateString()}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      ${booking.room?.rent}
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700">
                      <button
                        className={`py-1 px-2 rounded font-semibold text-white ${
                          booking.status === "booked"
                            ? "bg-yellow-500"
                            : booking.status === "approved"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </button>
                    </td>
                    <td className="border-b py-3 px-4 text-sm text-gray-700 flex space-x-2">
                      {booking.status === "booked" && (
                        <>
                          <button
                            onClick={() => handleApprove(booking._id)}
                            className="bg-green-500 text-white py-1 px-2 rounded"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleCancel(booking._id)}
                            className="bg-red-500 text-white py-1 px-2 rounded"
                          >
                            Cancel
                          </button>
                        </>
                      )}
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
