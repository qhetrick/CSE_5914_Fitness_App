import "../css/App.css";
import "../css/VideoCard.css";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FitFriend_Logo from "./FitFriend_Logo.jpeg";

function Home() {
  return (
    <div className="Home">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>
      <Box className="FitFriend_Logo" align="center">
        <img
          src={FitFriend_Logo}
          alt="FitFriend_Logo"
          style={{
            minHeight: "100vh",
            minWidth: "120vh",
            maxHeight: "100vw",
            maxWidth: "120vw",
          }}
        />
      </Box>
    </div>
  );
}

export default Home;
