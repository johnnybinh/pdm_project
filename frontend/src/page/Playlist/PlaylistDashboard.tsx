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

const PlaylistDashboard = () => {
  return (
    <div>
      <NavBar />
      <div className="p-8 justify-center items-center flex flex-col gap-2">
        <h1 className="text-4xl font-bold">Playlist</h1>
      </div>
    </div>
  );
};

export default PlaylistDashboard;
