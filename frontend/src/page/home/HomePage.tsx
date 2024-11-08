import React from "react";
import { Button } from "../../components/ui/button";
import { logout } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../util/userUtil";

const HomePage = async () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  const userData = await getUser();
  console.log(userData);
  return (
    <div className="flex justify-center items-center h-screen">
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default HomePage;
