import React from "react";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="border-b-2 h-16 border-border flex justify-between px-10 py-4 items-center">
      <div>
        <h1>Acne</h1>
      </div>
      <div className="flex justify-center items-center gap-2">
        <Link to={"/auth/login"}>
          <Button size={"lg"}>Login</Button>
        </Link>
        <Link to={"/auth/register"}>
          <Button variant={"ghost"} size={"lg"}>
            Sign up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
