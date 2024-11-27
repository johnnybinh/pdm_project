import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";
import AddVideoDialog from "./components/AddVideoDialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import ReactPlayer from "react-player";
import { Button } from "../../components/ui/button";

const PlaylistPage = () => {
  const params = useParams();
  const [playlist, setPlaylist] = useState(null); // Initialize as null
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0); // Index for the video being played

  // Fetch playlist data
  useEffect(() => {
    async function fetchPlaylist() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const res = await axios.get(
            `http://localhost:8080/playlists/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
        );
        setPlaylist(res.data); // Set playlist data
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    }
    fetchPlaylist();
  }, [params.id]);

  // Handle moving to the next video
  const handleNextVideo = () => {
    if (playlist?.videos && currentVideoIndex < playlist.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  // Handle moving to the previous video
  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
      <div>
        <NavBar />

        {playlist == null ? (
            <div className="flex justify-center items-center h-screen">
              <h1 className="text-xl">Loading...</h1>
            </div>
        ) : (
            <>
              {/* Playlist Information */}
              <div className="p-4 flex justify-center flex-col items-center gap-2">
                <h1 className="text-4xl font-bold">{playlist.playlistName}</h1>
                <h1 className="text-2xl">Created By: {playlist.userFullName}</h1>
                <AddVideoDialog playlistId={playlist.playlistId} />
              </div>

              {/* Video Player */}
              {playlist.videos && playlist.videos.length > 0 ? (
                  <div className="flex flex-col items-center p-4">
                    <h1 className="text-3xl font-bold mb-4">Now Playing</h1>

                    <ReactPlayer
                        url={playlist.videos[currentVideoIndex]?.videoUrl}
                        playing={true}
                        controls={true}
                        onEnded={handleNextVideo} // Automatically advance to the next video when the current one ends
                        width="100%"
                        height="50vh"
                    />

                    {/* Video Details */}
                    <h2 className="mt-4 text-2xl font-semibold">
                      {playlist.videos[currentVideoIndex]?.videoName}
                    </h2>
                    <p className="text-lg">
                      Uploaded by: {playlist.videos[currentVideoIndex]?.user.fullName}
                    </p>
                    <p className="text-lg">
                      Uploaded date:{" "}
                      {new Date(
                          playlist.videos[currentVideoIndex]?.createdDate
                      ).toLocaleDateString()}
                    </p>

                    {/* Video Playback Navigation */}
                    <div className="flex gap-4 mt-4">
                      <Button
                          onClick={handlePreviousVideo}
                          disabled={currentVideoIndex === 0}
                      >
                        Previous
                      </Button>
                      <Button
                          onClick={handleNextVideo}
                          disabled={
                              currentVideoIndex === playlist.videos.length - 1
                          }
                      >
                        Next
                      </Button>
                    </div>
                  </div>
              ) : (
                  <center className="flex flex-col justify-center">
                    <h1 className="text-2xl">Wow! Such empty</h1>
                    <h1 className="text-xl">Try adding a video above</h1>
                  </center>
              )}

              {/* Playlist Videos Below */}
              <div className="p-4 flex flex-wrap gap-4">
                {playlist.videos?.map((video, index) => (
                    <Card
                        className="w-1/4"
                        key={video.videoId}
                        onClick={() => {
                          setCurrentVideoIndex(index); // Set video index when a card is clicked
                        }}
                    >
                      <CardHeader>
                        <ReactPlayer
                            url={video.videoUrl}
                            width="100%"
                            height="50%"
                        />
                      </CardHeader>
                      <CardContent className="flex flex-col gap-2">
                        <CardTitle>{video.videoName}</CardTitle>
                        <h1>Uploaded by: {video.user.fullName}</h1>
                        <h1>
                          Uploaded date:{" "}
                          {new Date(video.createdDate).toLocaleDateString()}
                        </h1>
                      </CardContent>
                      <CardFooter>
                        <Link to={`/videos/${video.videoId}`}>
                          <Button>View</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                ))}
              </div>
            </>
        )}
      </div>
  );
};

export default PlaylistPage;