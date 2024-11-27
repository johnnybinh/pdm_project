import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUser } from "../../util/UserContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import ReactPlayer from "react-player";
import NavBar from "../components/NavBar";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";

const fetchVideos = async () => {
  const response = await axios.get("http://localhost:8080/videos/", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return response.data;
};

const HomePage = () => {
  const { user, loading: userLoading } = useUser();
  const {
    data: videos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["videos"],
    queryFn: fetchVideos,
  });

  if (userLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading videos</div>;
  }

  return (
      <div>
        <NavBar />
        <div className="p-10 flex gap-4 flex-col h-screen">
          <h1 className="text-4xl font-bold">Latest Videos</h1>
          <div className="grid grid-cols-4  gap-4  ">
            {videos.map((video) => (
                <Card className="w-full" key={video.id}>
                  <CardHeader>
                    <ReactPlayer
                        style={{ position: "relative" }}
                        url={video.videoUrl}
                        controls={true}
                        width="100%"
                        height="15rem"
                    />
                    <CardTitle>{video.videoName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Description: {video.videoDescription}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <h1>uploaded by: {video.user.fullName}</h1>
                  </CardFooter>
                  <CardFooter>
                    <Link to={`/videos/${video.videoId}`}>
                      <Button className="justify-self-end ">Watch</Button>
                    </Link>
                  </CardFooter>
                </Card>
            ))}
          </div>
        </div>
      </div>
  );
};

export default HomePage;