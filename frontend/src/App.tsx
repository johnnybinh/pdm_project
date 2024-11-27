import { Routes, Route } from "react-router-dom";
import LandingPage from "./page/LandingPage";
import { ThemeProvider } from "./util/theme-provider";
import Register from "./page/auth/register/Register";
import Login from "./page/auth/login/Login";
import HomePage from "./page/home/HomePage";
import Upload from "./page/upload/Upload";
import ProfilePage from "./page/Profile/ProfilePage";
import SearchPage from "./page/Search/Search";
import VideosPage from "./page/Videos/VideosPage";
import PlaylistDashboard from "./page/Playlist/PlaylistDashboard";
import PlaylistPage from "./page/Playlist/PlaylistPage";
import PlaylistPlayer from "./page/Playlist/PlaylistPlayer"; // Import the PlaylistPlayer component

const App = () => {
  return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth">
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
          <Route path="/home" element={<HomePage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/videos/:id" element={<VideosPage />} />
          <Route path="/playlist" element={<PlaylistDashboard />} />
          <Route path="/playlist/:id" element={<PlaylistPage />} />
          <Route path="/playlist/:id/play-all" element={<PlaylistPlayer />} /> {/* New route for Play All */}
        </Routes>
      </ThemeProvider>
  );
};

export default App;