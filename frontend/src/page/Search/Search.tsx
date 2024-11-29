import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/input";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
  FormLabel,
  FormDescription,
} from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from "../../components/ui/card";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const searchSchema = z.object({
  searchTerm: z.string(),
});

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      searchTerm: "",
    },
  });

  async function onSubmit(data: z.infer<typeof searchSchema>) {
    try {
      const res = await axios.get(
        `http://localhost:8080/videos/search?query=${data.searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSearchResult(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  return (
      <div>
        <NavBar />
        <div className="p-12">
          <div className="p-2  flex gap-4 flex-col bg-gre items-center">
            <h1 className="font-bold text-3xl">Search</h1>
            <Form {...form}>
              <form
                  action=""
                  className="w-1/2 gap-2 flex"
                  onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                    control={form.control}
                    name="searchTerm"
                    render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input className="" placeholder="Video name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                    )}
                />
                <Button>
                  <Search />
                </Button>
              </form>
            </Form>
          </div>
          <center>
            <div className="flex  items-center w-1/2">
              {searchResult === undefined ? (
                  <div>Type Your Query</div>
              ) : (
                  <div className="flex gap-2 flex-col">
                    {searchResult.map((res, index) => (
                        <Card className="w-full" key={index}>
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <ReactPlayer
                                  width={"40%"}
                                  height={"12rem"}
                                  url={res.videoUrl}
                              />
                              <div className="flex flex-col items-start w-3/5">
                                <h1 className="font-bold">{res.videoName}</h1>
                                <h1 className="">
                                  Description:{res.videoDescription}
                                </h1>
                                <h1 className="">Upload by: {res.user.fullName}</h1>
                                <h1 className="">
                                  Date: {formatDate(res.createdDate)}
                                </h1>
                              </div>
                              <div className=" w-1/4">
                                <Link to={`/videos/${res.videoId}`}>
                                  <Button className="justify-self-end ">Watch</Button>
                                </Link>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                    ))}
                  </div>
              )}
            </div>
          </center>
        </div>
      </div>
  );
};

export default SearchPage;
