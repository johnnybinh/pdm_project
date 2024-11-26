import React from "react";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../util/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { logout } from "../../util/auth";

const NavBar = () => {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  return (
    <div className="sticky top-0  z-50 bg-background overflow-hidden w-full  border-b-2 h-16 border-border flex justify-between px-10 py-4 items-center">
      {localStorage.getItem("token") === null ? (
        <>
          <div className="flex text-2xl">
            <h1 className="font-bold">Watch</h1>
            <h1 className="font-bold text-red-500">Anywere</h1>
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
        </>
      ) : (
        <>
          {loading ? (
            <div>loading</div>
          ) : (
            <>
              <div className="flex justify-center items-center gap-2">
                <Link to={"/home"} className="flex text-2xl">
                  <h1 className="font-bold">Watch</h1>
                  <h1 className="font-bold text-red-500">Anywere</h1>
                </Link>
                <div>
                  <Link to={"/upload"}>
                    <Button variant={"link"}>Upload</Button>
                  </Link>
                  <Link to={"/search"}>
                    <Button variant={"link"}>Search</Button>
                  </Link>

                  {/* <Link to={"/playlist"}>
                    <Button variant={"link"}>Playlist</Button>
                  </Link> */}

                  <Link to={"/profile"}>
                    <Button variant={"link"}>Profile</Button>
                  </Link>
                </div>
              </div>

              <div className="flex justify-center items-center gap-4">
                <img
                  src={`https://api.dicebear.com/9.x/initials/svg/seed=${user.fullName}`}
                  alt=""
                  width="40"
                  className="rounded-full"
                />
                <div className="">{user.fullName}</div>
                <Button
                  onClick={() => {
                    logout();
                    navigate("/auth/login");
                  }}
                >
                  Logout
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default NavBar;
