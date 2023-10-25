import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar theme={theme} color="primary" position="static">
      <Toolbar>
        <Typography sx={{ p: 1 }} variant="h5"> FitFriend </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/search" rel="noreferrer">Search for Workout</Button>
        <Button color="inherit" href="/exercise">Exercises</Button>
        <Button color="inherit" href="/about">About</Button>
      </Toolbar>
    </AppBar>
  );
}
