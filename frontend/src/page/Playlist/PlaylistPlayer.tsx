import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Button } from "../../components/ui/button";
import axios from "axios";

const PlaylistPlayer = () => {
    const { id } = useParams(); // Playlist ID from the route
    const [videos, setVideos] = useState([]);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    useEffect(() => {
        async function fetchPlaylistVideos() {
            try {
                const res = await axios.get(`http://localhost:8080/playlists/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setVideos(res.data.videos);
            } catch (error) {
                console.error("Error fetching playlist videos:", error);
            }
        }

        fetchPlaylistVideos();
    }, [id]);

    const handleNextVideo = () => {
        if (currentVideoIndex < videos.length - 1) {
            setCurrentVideoIndex(currentVideoIndex + 1);
        }
    };

    const handlePreviousVideo = () => {
        if (currentVideoIndex > 0) {
            setCurrentVideoIndex(currentVideoIndex - 1);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-4">Playing Playlist Videos</h1>

            {videos.length > 0 ? (
                <>
                    <ReactPlayer
                        url={videos[currentVideoIndex]?.videoUrl}
                        playing={true}
                        controls={true}
                        onEnded={handleNextVideo} // Automatically go to the next video
                    />
                    <h1 className="mt-4 text-2xl">{videos[currentVideoIndex]?.videoName}</h1>

                    <div className="flex gap-4 mt-4">
                        <Button
                            onClick={handlePreviousVideo}
                            disabled={currentVideoIndex === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={handleNextVideo}
                            disabled={currentVideoIndex === videos.length - 1}
                        >
                            Next
                        </Button>
                    </div>
                </>
            ) : (
                <h1 className="text-xl">No videos in this playlist</h1>
            )}
        </div>
    );
};

export default PlaylistPlayer;