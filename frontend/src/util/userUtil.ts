import axios from "axios";

export const getUser = async () => {
  try {
    const user = await axios.get("http://localhost:8080/users/me", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return user.data;
  } catch (error) {
    console.log(error);
  }
};
