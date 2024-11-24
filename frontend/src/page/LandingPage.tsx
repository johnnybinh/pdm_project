import React from "react";
import { Button } from "../components/ui/button";
import NavBar from "./components/NavBar";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-background h-screen">
      <NavBar />
      <div className="flex flex-col gap-8 justify-center items-center h-3/4">
        <div className="flex flex-col justify-center items-center gap-4 font-bold">
          <h1 className="text-8xl">Watch Videos</h1>
          <h1 className="text-8xl text-red-600">Anywhere</h1>
        </div>
        <div className="flex w-1/2  justify-center items-center gap-4">
          <Link to={"/auth/login"} className="w-1/4 h-16">
            <Button className="w-full h-full">Get Started</Button>
          </Link>
          <Link className="w-1/4 h-16" to="#">
            <Button className="w-full h-full" variant={"secondary"}>
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
