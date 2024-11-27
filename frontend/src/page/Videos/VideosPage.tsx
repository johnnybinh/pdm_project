import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import ReactPlayer from "react-player";

const VideosPage = () => {
  const params = useParams();
  const [videos, setVideos] = useState(null);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const videosPerPage = 6;

  useEffect(() => {
    async function fetchVideo() {
      try {
        const res = await axios.get(
            `http://localhost:8080/videos/${params.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
        );
        setVideos(res.data);
      } catch (error) {
        setError("Failed to load video");
        console.error("Error fetching video:", error);
      }
    }

    if (params.id) {
      fetchVideo();
    }
  }, [params.id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Calculate the current recommendations to display
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentRecommendations = videos?.recommendations?.slice(
      indexOfFirstVideo,
      indexOfLastVideo
  );

  // Calculate total pages
  const totalPages = Math.ceil((videos?.recommendations?.length || 0) / videosPerPage);

  return (
      <div>
        <NavBar />
        {videos === null ? (
            <div>Loading...</div>
        ) : (
            <>
              {/* Main Video Section */}
              <div className="p-8 w-full flex justify-center">
                <div className="w-full max-w-4xl">
                  <ReactPlayer
                      width={"100%"}
                      height={"500px"}
                      controls={true}
                      url={videos.videoUrl}
                  />
                  <div className="mt-4">
                    <h1 className="text-2xl font-bold">{videos.videoName}</h1>
                    <h1 className="text-lg">
                      Description: {videos.videoDescription}
                    </h1>
                    <div className="flex items-center mt-2">
                      <img
                          className="rounded-full"
                          src={videos.user.profilePicture}
                          width={"40"}
                          alt=""
                      />
                      <span className="ml-2 text-lg">{videos.user.fullName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations Section */}
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">Recommended Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentRecommendations && currentRecommendations.length > 0 ? (
                      currentRecommendations.map((rcm) => (
                          <div
                              key={rcm.videoId}
                              className="border rounded-lg p-4 shadow-md"
                          >
                            <ReactPlayer
                                url={rcm.videoUrl}
                                width="100%"
                                height="100px"
                                controls={false}
                            />
                            <h3 className="text-xl font-semibold mt-2">
                              {rcm.videoName}
                            </h3>
                            <p className="text-gray-600">{rcm.videoDescription}</p>
                            <div className="flex items-center mt-2">
                              <img
                                  className="rounded-full"
                                  src={rcm.user.profilePicture}
                                  alt={rcm.user.fullName}
                                  width="30"
                              />
                              <span className="ml-2">{rcm.user.fullName}</span>
                            </div>
                            <Link
                                to={`/videos/${rcm.videoId}`}
                                className="text-blue-500 mt-2 block"
                            >
                              Watch Now
                            </Link>
                          </div>
                      ))
                  ) : (
                      <p>No recommendations available.</p>
                  )}
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                  <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Previous
                  </button>
                  <span className="self-center">{`${currentPage} of ${totalPages}`}</span>
                  <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="mx-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
        )}
      </div>
  );
};

export default VideosPage;