import "../css/App.css";
import "../css/VideoCard.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Navbar from "../components/Navbar";
import FitFriend_Logo from "./FitFriend_Logo.jpeg";

function Home() {

  async function getAll(){
    await fetch("http://localhost:5000/exercises").then(response =>{
      console.log(response);
      console.log(response.json())
    });
  }

  return (
    <div className="Home">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>
      <Box className="FitFriend_Logo" align="center">
        <Button onClick={getAll}>
          Click Me!
        </Button>
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
