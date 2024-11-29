import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext({
  user: null,
  loading: true,
  updateUser: () => {},
  addVideo: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (token) => {
    try {
      const response = await axios.get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetchUser(token);
    } else {
      setUser(null);
      setLoading(false); // Avoid flicker by deferring until token is checked
    }
  };

  const addVideo = async (newVideo) => {
    if (user) {
      try {
        const response = await axios.post(
            "http://localhost:8080/videos",
            newVideo,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );

        const addedVideo = response.data;

        setUser((prevUser) => ({
          ...prevUser,
          videos: [...prevUser.videos, addedVideo],
        }));
      } catch (error) {
        console.error("Failed to add video", error);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoading(true);
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  return (
      <UserContext.Provider value={{ user, loading, updateUser, addVideo }}>
        {children}
      </UserContext.Provider>
  );
};
