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
            <p>Loading...</p>
        ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-screen-xl max-h-screen overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    Add Video for Playlist: {JSON.stringify(playlistId.playlistId)}
                  </DialogTitle>
                </DialogHeader>

                <DialogHeader>
                  <Form {...form}>
                    <form
                        className="flex flex-row items-center gap-2 justify-center w-full"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <FormField
                          control={form.control}
                          name="query"
                          render={({ field }) => (
                              <FormItem className="w-full">
                                <FormControl>
                                  <Input
                                      className="border-2 p-2 rounded-md"
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
                  {videos == null ? (
                      <h1 className="text-center">Type your query above to search for videos</h1>
                  ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {videos.map((video, index) => (
                            <Card key={index} className="shadow-lg rounded-lg overflow-hidden">
                              <CardHeader className="flex flex-col items-center gap-4">
                                <ReactPlayer
                                    width={"100%"}
                                    height={"200px"}
                                    url={video.videoUrl}
                                    controls={true}
                                    className="mb-4"
                                />
                                <CardTitle className="w-full text-center p-4">
                                  <h2 className="text-xl font-semibold">{video.videoName}</h2>
                                  <p className="text-md text-gray-600">Uploaded by: {video.user.fullName}</p>
                                </CardTitle>
                                <Button
                                    onClick={() => {
                                      handleVideoAdd(video.videoId, user.userId);
                                    }}
                                    size={"lg"}
                                    className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-md"
                                >
                                  Add to Playlist
                                </Button>
                              </CardHeader>
                            </Card>
                        ))}
                      </div>
                  )}
                </DialogDescription>
              </DialogContent>
            </Dialog>
        )}
      </>
  );
};

export default AddVideoDialog;
