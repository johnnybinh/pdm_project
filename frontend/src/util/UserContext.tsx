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

  // Function to fetch user data based on the token
  const fetchUser = async (token) => {
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

  // Function to manually update the user data (e.g., after login or token change)
  const updateUser = () => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      setLoading(true); // Set loading state to true during fetch
      fetchUser(token); // Fetch the user data
    } else {
      setUser(null); // Clear user if no token exists
      setLoading(false); // Stop loading
    }
  };

  // Initial fetch of user data when the provider mounts
  useEffect(() => {
    updateUser(); // Call updateUser to fetch user data on initial mount
  }, []);

  return (
      <UserContext.Provider value={{ user, loading, updateUser }}>
        {children}
      </UserContext.Provider>
  );
};