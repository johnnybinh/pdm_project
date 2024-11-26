import React from "react";
import NavBar from "../components/NavBar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPlaylist = async () => {

  const response = await axios.get("http://localhost:8080/playlists/", {

    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const PlaylistDashboard = () => {
  const {
    data: playlist,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylist,
  });

  console.log(error);

  return (
    <div>
      <NavBar />
      <div className="p-8 justify-center items-center flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Playlist</h1>
        <h1 className="text-4xl font-bold">Under Construction</h1>
      </div>
    </div>
  );
};

export default PlaylistDashboard;
