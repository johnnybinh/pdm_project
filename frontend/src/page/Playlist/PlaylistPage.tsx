import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";

const PlaylistPage = () => {
  const params = useParams();
  const [playlist, setPlaylist] = useState("");
  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const res = await axios.get(
          `http://localhost:8080/playlists/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data); // Log the response data
        setPlaylist(res.data);
      } catch (error) {
        console.log(error);
        return error;
      }
    }
    fetchPlaylist();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1>Playlist {JSON.stringify(playlist)}</h1>
      </div>
    </div>
  );
};

export default PlaylistPage;
