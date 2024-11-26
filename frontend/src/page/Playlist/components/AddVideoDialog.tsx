import React, { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Plus, User } from "lucide-react";
import { SearchIcon } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../../components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../../../components/ui/card";
import ReactPlayer from "react-player";
import { useUser } from "../../../util/UserContext";

const searchSchema = z.object({
  query: z.string(),
});

const AddVideoDialog = (playlistId: any, userId) => {
  const [videos, setVideos] = useState();
  const { user } = useUser();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof searchSchema>) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/videos/search?query=${data.query}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setVideos(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVideoAdd = (id, userId) => {
    const data = { videoId: id, userId: userId };
    try {
      const res = axios.post(
        `http://localhost:8080/playlists/${playlistId.playlistId}/save`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      console.log(res.data);
      toast({
        title: "success!",
        description: "Added video to playlist",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {user == null ? (
        <p>loadingq</p>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-screen-xl">
            <DialogHeader>
              {" "}
              <DialogTitle>
                {" "}
                Add video for playlist {JSON.stringify(playlistId.playlistId)}
              </DialogTitle>
            </DialogHeader>
            <DialogHeader>
              <Form {...form}>
                <form
                  className="flex flex-row items-center gap-2 justify-center w-full "
                  action=""
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="query"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            className=""
                            placeholder="Video Name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">
                    <SearchIcon />
                  </Button>
                </form>
              </Form>
            </DialogHeader>
            <DialogDescription>
              {/* <div className="">{JSON.stringify(videos)}</div> */}
              {videos == null ? (
                <h1>type your query above</h1>
              ) : (
                <>
                  {videos.map((video, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center gap-4">
                        <ReactPlayer
                          width={"20rem"}
                          height={"10rem"}
                          url={video.videoUrl}
                          controls={true}
                        ></ReactPlayer>
                        <CardTitle className="w-1/3 p-4">
                          <h1 className="text-2xl">{video.videoName}</h1>
                          <h1 className="text-2xl">
                            uploaded by: {video.user.fullName}
                          </h1>
                        </CardTitle>
                        <div className="w-1/2 flex justify-center">
                          <Button
                            onClick={() => {
                              handleVideoAdd(video.videoId, user.userId);
                            }}
                            size={"lg"}
                          >
                            Add to playlist
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </>
              )}
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default AddVideoDialog;
