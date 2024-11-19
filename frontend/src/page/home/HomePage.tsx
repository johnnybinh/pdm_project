import React, { useEffect, useState } from "react";
import { logout } from "../../util/auth";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../util/userUtil";

const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUser();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/auth/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {userData ? (
        <div>
          <h1>{JSON.stringify(userData.email)}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default HomePage;
