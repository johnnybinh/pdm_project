import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Plus } from "lucide-react";
import { useUser } from "../../../util/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import axios from "axios";

const playlistSchema = z.object({
  playlistName: z.string(),
  userId: z.string(),
});

export const NewPlaylistDialog = () => {
  const { user, loading } = useUser();

  const form = useForm<z.infer<typeof playlistSchema>>({
    resolver: zodResolver(playlistSchema),
    defaultValues: {
      playlistName: "",
      userId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof playlistSchema>) {
    try {
      data.userId = user.userId;
      const res = await axios.post(
        "http://localhost:8080/playlists/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      window.location.reload();
    } catch (error) {
      console.log("error" + error);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[425px]">
        {loading ? (
          <h1>loading</h1>
        ) : (
          <>
            {" "}
            <DialogHeader>
              {" "}
              <DialogTitle>New Playlist</DialogTitle>
              <DialogDescription>Create your new playlist</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 ">
              <Form {...form}>
                <form
                  className="flex flex-col gap-4"
                  action=""
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  {" "}
                  <FormField
                    control={form.control}
                    name="playlistName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Playlist Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="My Awesomve Playlist"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  ></FormField>
                  <Button type="submit">Create</Button>
                </form>
              </Form>
            </div>
            <DialogFooter></DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
