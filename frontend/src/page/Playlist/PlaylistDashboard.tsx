import React from "react";
import NavBar from "../components/NavBar";
import {
  Dialog,
  DialogContent,
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
    data: playlists,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["playlists"],
    queryFn: fetchPlaylist,
  });

  return (
      <div>
        <NavBar />
        <div className="p-8 flex flex-col gap-4 items-center">
          <h1 className="text-4xl font-bold">Playlist Dashboard</h1>

          {/* Loading State */}
          {isLoading && (
              <p className="text-gray-500 text-lg">Loading playlists...</p>
          )}

          {/* Error State */}
          {error && (
              <p className="text-red-500 text-lg">
                Failed to load playlists. Please try again later.
              </p>
          )}

          {/* Data Display */}
          {playlists && playlists.length > 0 ? (
              <ul className="w-full max-w-md bg-white shadow-md rounded-lg">
                {playlists.map((playlist: any) => (
                    <li
                        key={playlist.id}
                        className="p-4 border-b last:border-none hover:bg-gray-100"
                    >
                      <h2 className="text-xl font-semibold">{playlist.name}</h2>
                      <p className="text-gray-600">{playlist.description}</p>
                    </li>
                ))}
              </ul>
          ) : (
              !isLoading && (
                  <p className="text-gray-500 text-lg">No playlists found.</p>
              )
          )}

          {/* Add Playlist Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Playlist</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Playlist</DialogTitle>
              </DialogHeader>
              <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Add logic to handle form submission
                  }}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <Label htmlFor="name">Playlist Name</Label>
                    <Input id="name" type="text" placeholder="Enter name" required />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        id="description"
                        type="text"
                        placeholder="Enter description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
  );
};

export default PlaylistDashboard;