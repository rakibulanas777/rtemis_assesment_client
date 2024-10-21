"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setReload] = useState(false); // Add reload state

  const fetchRooms = useCallback(async () => {
    setLoading(true); // Start loading when fetching rooms
    try {
      const response = await axios.get(
        "https://rtemis-assesment-server-2.onrender.com/api/v1/rooms/getAllRooms"
      );
      setRooms(response.data.data.rooms);
      setError(null); // Clear previous error
    } catch (err) {
      console.error(err);
      setError("Failed to load rooms");
    } finally {
      setLoading(false); // End loading
    }
  }, []);

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms, reload]);

  return (
    <RoomContext.Provider value={{ rooms, loading, error, setReload }}>
      {children}
    </RoomContext.Provider>
  );
};

const useRoomContext = () => {
  return useContext(RoomContext);
};

export { RoomProvider, useRoomContext };
