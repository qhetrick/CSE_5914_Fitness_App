import "../css/Search.css";
import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

function Search() {
  return (
    <div className="Search">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Typography color={"white"} variant="h1">
          Search Page
        </Typography>
      </Box>
    </div>
  );
}

export default Search;
