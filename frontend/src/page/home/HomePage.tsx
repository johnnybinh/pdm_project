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
    <div className="p-10">
      <h1>Latest Videos</h1>
      <div className="flex">
        {videos.map((video) => (
          <Card className="w-1/4" key={video.id}>
            <CardHeader>
              <ReactPlayer
                style={{ position: "relative" }}
                url={video.videoUrl}
                controls={true}
                width="100%"
                height="100%"
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
