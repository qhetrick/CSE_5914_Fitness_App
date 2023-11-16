import "../css/App.css";
import "../css/VideoCard.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FitFriend_Logo from "./FitFriend_Logo.jpeg";

import React, { useState } from 'react';


function Home() {

  const [exercises, setExercises] = useState([]);
  const [showData, setShowData] = useState(false);

  // Fetch exercises when the component mounts


  // CSS for the scrollable container
  const scrollableContainerStyle = {
    height: '400px',
    overflowY: 'auto',
    color: 'white', // White text color
    border: '1px solid #ddd',
    marginTop: '20px',
    padding: '10px',
    display: showData ? 'block' : 'none', // Only display when showData is true
    fontFamily: 'monospace',
  };

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

      {/* Scrollable container for raw JSON data */}
      <div style={scrollableContainerStyle}>
        <pre>{JSON.stringify(exercises, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Home;
