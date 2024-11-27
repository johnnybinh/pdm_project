import React, { useState } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "../../util/uploadthing";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useUser } from "../../util/UserContext";
import axios from "axios";
import NavBar from "../components/NavBar";
import { useToast } from "../../hooks/use-toast";

const uploadSchema = z.object({
  videoName: z.string(),
  videoDescription: z.string(),
  videoUrl: z.string(),
  userId: z.string(),
});

const Upload = () => {
  const { user, loading } = useUser();
  const { toast } = useToast(); // Initialize the toast function
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      videoName: "",
      videoDescription: "",
      videoUrl: "",
      userId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof uploadSchema>) {
    try {
      console.log("submitting...");
      if (user) {
        data.userId = user.userId;
      }
      const response = await axios.post(
          "http://localhost:8080/videos/upload",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
      );

      toast({
        title: "Video Uploaded",
        description: "Your video has been uploaded successfully!",
      });

      return response.data;
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to upload video. Please try again.",
      });
      console.error(error);
    }
  }

  return (
      <>
        {loading ? (
            <h1>loading</h1>
        ) : (
            <div>
              <NavBar />
              <div className="w-full h-screen flex flex-col justify-center items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Create New Video
                </h1>
                <h1>{loading}</h1>
                <Form {...form}>
                  <form
                      className="w-1/2"
                      onSubmit={form.handleSubmit(onSubmit)}
                      action=""
                  >
                    <FormField
                        control={form.control}
                        name="videoName"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video Title</FormLabel>
                              <FormControl>
                                <Input placeholder="My Awesome Video" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="videoDescription"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video Description</FormLabel>
                              <FormControl>
                                <Input
                                    className="h-24"
                                    placeholder="My Awesome Video Description"
                                    {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="videoUrl"
                        render={({ field }) => (
                            <FormItem>
                              <FormLabel>Video Url</FormLabel>
                              <FormControl>
                                <Input
                                    placeholder="utfs.io/"
                                    disabled={true}
                                    {...field}
                                    value={videoUrl ?? ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                    />
                    <UploadDropzone
                        className="w-full"
                        appearance={{
                          button() {
                            return {
                              backgroundColor: "red",
                              color: "white",
                            };
                          },
                        }}
                        endpoint={"videoUploader"}
                        onClientUploadComplete={(file) => {
                          console.log("uploaded", file[0].url);
                          setVideoUrl(file[0].url);
                          form.setValue("videoUrl", file[0].url);

                          toast({
                            title: "Upload Successful",
                            description: "Your video URL has been generated!",
                          });
                        }}
                        onUploadError={(err) => {
                          console.log(err);
                          toast({
                            variant: "destructive",
                            title: "Upload Failed",
                            description: "Failed to upload video. Please try again.",
                          });
                        }}
                    />
                    <Button type="submit">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>
        )}
      </>
  );
};

export default Upload;