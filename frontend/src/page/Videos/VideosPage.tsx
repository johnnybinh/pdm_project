import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";
import ReactPlayer from "react-player";

const VideosPage = () => {
  let params = useParams();
  const [videos, setVideos] = useState();
  useEffect(() => {
    try {
      async function fetchVideo() {
        const res = await axios.get(
          `http://localhost:8080/videos/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        //console.log(res);
        setVideos(res.data);
        return res.data;
      }
      fetchVideo();
    } catch (error) {
      console.log("error");
    }
  }, []);

  return (
    <div>
      <NavBar />
      {videos === undefined ? (
        <div>loading</div>
      ) : (
        <>
          <div className="p-8 fixed w-full">
            <div className="w-full  h-screen flex flex-col items-center gap-4 justify-start">
              <ReactPlayer
                width={"75%"}
                height={"50%"}
                controls={true}
                url={videos.videoUrl}
              />
              <div className=" w-3/4">
                <h1 className="text-2xl font-bold">{videos.videoName}</h1>
                <h1 className="text-2xl ">
                  Description: {videos.videoDescription}
                </h1>
                <div>
                  <h1 className="flex items-center gap-2 text-2xl">
                    <img
                      className="rounded-full"
                      src={videos.user.profilePicture}
                      width={"3%"}
                      alt=""
                    />{" "}
                    {videos.user.fullName}{" "}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideosPage;
