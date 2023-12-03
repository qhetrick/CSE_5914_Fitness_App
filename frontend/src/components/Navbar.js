import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar theme={theme} color="primary" position="static">
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none", color: "inherit", display: "flex", alignItems: "center" }}>
          <Typography variant="h5">
            FitFriend
          </Typography>
        </Link>
        <Button color="inherit" component={Link} to="/searchforexercises">
          Search for Exercises
        </Button>
        <Button color="inherit" component={Link} to="/generateworkout">
          Generate Plan
        </Button>
        <Button color="inherit" component={Link} to="/about">
          About
        </Button>
      </Toolbar>
    </AppBar>
  );
}
