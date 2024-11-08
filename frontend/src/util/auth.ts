import axios from "axios";
import { useNavigate } from "react-router-dom";

export async function register(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  profilePicture: string;
}) {
  try {
    const response = await axios.post(
      "http://localhost:8080/auth/signup",
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function login(data: { email: string; password: string }) {
  try {
    const response = await axios.post("http://localhost:8080/auth/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

export async function logout() {
  localStorage.clear();
}

export function checkLogin() {
  return localStorage.getItem("token") === null;
}
