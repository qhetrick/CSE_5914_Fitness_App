import "../css/VideoCard.css";
import CSVDisplay from "../components/CSVDisplay";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";

function Exercises() {
  return (
    <div className="Exercises">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>
      <CSVDisplay />
    </div>
  );
}

export default Exercises;
