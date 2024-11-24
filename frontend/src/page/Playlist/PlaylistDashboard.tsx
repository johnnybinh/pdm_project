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
        <h1 className="text-4xl font-bold">My Playlist</h1>
        <NewPlaylistDialog />
      </div>
    </div>
  );
};

const NewPlaylistDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">New Playlist</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Playlist</DialogTitle>
          <DialogDescription>Create your new playlist</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="My Awesome Playlist"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistDashboard;
