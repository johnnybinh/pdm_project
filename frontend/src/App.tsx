import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import { ThemeProvider } from "./util/theme-provider";
import Register from "./page/auth/register/Register";
import Login from "./page/auth/login/Login";
import HomePage from "./page/home/HomePage";
import Upload from "./page/upload/Upload";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/auth">
          <Route path="/auth/login" element={<Login />}></Route>
          <Route path="/auth/register" element={<Register />}></Route>
        </Route>
        <Route path="/home" element={<HomePage />} />
        <Route path="/upload" element={<Upload />}></Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App;
