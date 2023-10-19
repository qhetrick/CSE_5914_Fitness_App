import "../css/App.css";
import "../css/VideoCard.css";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

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
        <div></div>
      </Box>
    </div>
  );
}

export default Home;
