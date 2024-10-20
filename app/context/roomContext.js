"use client";

import { createContext, useState, useContext } from "react";

const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [room, setRoom] = useState(null);
  return (
    <RoomContext.Provider value={{ room, setRoom }}>
      {children}
    </RoomContext.Provider>
  );
};

const useRoomContext = () => {
  return useContext(RoomContext);
};

export { RoomProvider, useRoomContext };
