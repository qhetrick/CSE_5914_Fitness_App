import "../css/App.css";
import "../css/VideoCard.css";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FitFriend_Logo from "./FitFriend_Logo.jpeg";

function Home() {
  return (
    <div
      className="Home"
      style={{
        backgroundImage: "url(Frontend/src/pages/FitFriend_Logo.jpeg )",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>
      <Box className="FitFriend_Logo" sx={{ flexGrow: 1 }}>
        <img src={FitFriend_Logo} alt="FitFriend_Logo" />
      </Box>
    </div>
  );
}

export default Home;
