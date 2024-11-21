import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create a context for user
const UserContext = createContext({ user: null, loading: true });

export const useUser = () => {
  return useContext(UserContext); // Custom hook to access user context
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store the user object
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If a token exists, fetch the user data
    if (token) {
      const fetchUser = async () => {
        try {
          const response = await axios.get("http://localhost:8080/users/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data); // Set the user data
        } catch (error) {
          console.error("Failed to fetch user data", error);
          setUser(null); // Clear user on error
        } finally {
          setLoading(false); // Stop loading after data is fetched
        }
      };
      fetchUser();
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};
