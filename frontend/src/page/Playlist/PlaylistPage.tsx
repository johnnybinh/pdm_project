import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AddVideoDialog from "./components/AddVideoDialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import ReactPlayer from "react-player";
import { Button } from "../../components/ui/button";

const PlaylistPage = () => {
  const params = useParams();
  const [playlist, setPlaylist] = useState();
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
      {playlist == null ? (
        <div>loading</div>
      ) : (
        <>
          <div className="p-4 flex justify-center flex-col items-center gap-2">
            {/* <h1>Playlist {JSON.stringify(playlist)}</h1> */}
            <h1 className="text-4xl font-bold">{playlist.playlistName}</h1>
            <h1 className="text-2xl">Created By:{playlist.userFullName}</h1>
            <AddVideoDialog playlistId={playlist.playlistId} />
          </div>
          <div>
            {playlist.videos && playlist.videos.length === 0 ? (
              <center className=" flex flex-col justify-center">
                <h1 className="text-2xl">wow! such empty</h1>
                <h1 className="text-xl">Try adding a video above</h1>
              </center>
            ) : (
              <div className="p-4 flex w-full">
                {playlist.videos.map((video, index) => (
                  <Card className="w-1/4">
                    <CardHeader>
                      <ReactPlayer
                        url={video.videoUrl}
                        width={"100%"}
                        height={"50%"}
                      />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                      <CardTitle>{video.videoName}</CardTitle>
                      <h1>Uploaded by: {video.user.fullName}</h1>
                      <h1>Uploaded date: {video.createdDate}</h1>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/videos/${video.videoId}`}>
                        {" "}
                        <Button>View</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PlaylistPage;
