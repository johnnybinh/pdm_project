import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../../util/UserContext";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
} from "../../components/ui/card";
import ReactPlayer from "react-player";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { NewPlaylistDialog } from "./components/NewPlaylistDialog";

const ProfilePage = () => {
    const { user, loading, updateUser } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const videosPerPage = 6;

    useEffect(() => {
        updateUser();
        document.title = "My Profile";
    }, []);

    const totalVideos = user?.videos?.length || 0;
    const totalPages = Math.ceil(totalVideos / videosPerPage);
    const startIndex = (currentPage - 1) * videosPerPage;
    const currentVideos = user?.videos?.slice(startIndex, startIndex + videosPerPage) || [];

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return (
        <div>
            <NavBar />
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </div>
            ) : (
                <div className="p-6 flex flex-col gap-6">
                    {/* Profile Section */}
                    <div className="flex flex-col gap-6 items-center w-full">
                        <h1 className="text-4xl font-bold">My Profile</h1>
                        <div className="flex flex-col gap-4 items-center">
                            <img
                                src={`https://api.dicebear.com/9.x/initials/svg/seed=${user.fullName}`}
                                alt={`${user.fullName}'s avatar`}
                                width="100"
                                className="rounded-full"
                            />
                            <h1 className="text-3xl">{user.fullName}</h1>
                        </div>
                    </div>

                    {/* My Videos Section */}
                    <div className="flex flex-col gap-6">
                        <h1 className="text-2xl font-bold">My Videos</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {currentVideos.length > 0 ? (
                                currentVideos.map((video, index) => (
                                    <Card className="w-full" key={index}>
                                        <CardHeader>
                                            <ReactPlayer
                                                url={video.url}
                                                controls={false}
                                                playing={false}
                                                loop={true}
                                                width="100%"
                                                height="180px"
                                                style={{
                                                    maxWidth: "100%",
                                                    borderRadius: "8px",
                                                }}
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle>{video.title}</CardTitle>
                                        </CardContent>
                                        <CardFooter>
                                            <Link to={`/videos/${video.videoId}`}>
                                                <Button>View</Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-gray-500 text-center">No videos found</div>
                            )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-4">
                                <Button
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 1}
                                    className={`${
                                        currentPage === 1
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gray-600 hover:bg-gray-700"
                                    }`}
                                >
                                    Previous
                                </Button>
                                <span className="text-lg font-semibold">
                  Page {currentPage} of {totalPages}
                </span>
                                <Button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`${
                                        currentPage === totalPages
                                            ? "bg-gray-300 cursor-not-allowed"
                                            : "bg-gray-600 hover:bg-gray-700"
                                    }`}
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* My Playlists Section */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-bold">My Playlists</h1>
                            <NewPlaylistDialog />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {user?.playlists?.length > 0 ? (
                                user.playlists.map((playlist, index) => (
                                    <Card className="w-full" key={index}>
                                        <CardHeader>
                                            <CardTitle>{playlist.playlistName}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <h1>Owner: {user.fullName}</h1>
                                        </CardContent>
                                        <CardFooter className="flex justify-between">
                                            <Link to={`/playlist/${playlist.playlistId}`}>
                                                <Button>View</Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                ))
                            ) : (
                                <div className="text-gray-500 text-center">No playlists found</div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;