import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import { useUser } from "../../util/UserContext";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "../../components/ui/card";
import ReactPlayer from "react-player";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { NewPlaylistDialog } from "./components/NewPlaylistDialog";
import axios from "axios";

const ProfilePage = () => {
  const { user, loading } = useUser();
  useEffect(() => {
    document.title = "My Profile";
  }, []);
  return (
    <div>
      <NavBar />
      {loading ? (
        <div>loading</div>
      ) : (
        <div className="p-4 flex flex-col gap-4">
          <div className="flex flex-col gap-8 items-center w-full ">
            <h1 className="text-4xl font-bold">My Profile</h1>
            <div className="flex flex-col gap-4 items-center">
              {" "}
              <img
                src={`https://api.dicebear.com/9.x/initials/svg/seed=${user.fullName}`}
                alt=""
                width="100"
                className="rounded-full"
              />
              <h1 className="text-3xl">{user.fullName}</h1>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold">My Video</h1>
            <div className="flex gap-2">
              {user.videos.map((video, index) => (
                <Card className="w-1/4" key={index}>
                  <CardHeader>
                    <ReactPlayer
                      style={{ position: "relative" }}
                      url={video.url}
                      controls={false}
                      playing={false}
                      loop={true}
                      width="100%"
                      height="15rem"
                    />
                  </CardHeader>
                  <CardContent>
                    {" "}
                    <CardTitle>{video.title}</CardTitle>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/videos/${video.videoId}`}>
                      <Button>View</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            <div className="text-2xl font-bold">
              My Playlist <NewPlaylistDialog />
            </div>
            <div className="flex gap-2">
              {user.playlists.map((list, index) => (
                <Card className="w-1/4">
                  <CardHeader>
                    <CardTitle>{list.playlistName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <h1>Owner: {user.fullName}</h1>
                    <h1>id: {list.playlistId}</h1>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link to={`/playlist/${list.playlistId}`}>
                      <Button>View</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
