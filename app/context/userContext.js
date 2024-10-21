"use client";
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state
  const [reload, setReload] = useState(false);

  const fetchCurrentUser = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://rtemis-assesment-server-2.onrender.com/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch current user");
      }

      const data = await response.json();
      setUser(data.data.user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    } finally {
      setLoading(false); // End loading
    }
  }, [reload]);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const userContextValue = useMemo(
    () => ({ user, setUser, loading, setReload }),
    [user, loading]
  );

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
