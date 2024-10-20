"use client";

import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/rooms/getAllRooms"
        );
        setRooms(response.data.data.rooms);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load rooms");
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <RoomContext.Provider value={{ rooms, loading, error }}>
      {children}
    </RoomContext.Provider>
  );
};

const useRoomContext = () => {
  return useContext(RoomContext);
};

export { RoomProvider, useRoomContext };
