import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar theme={theme} color="primary" position="static">
      <Toolbar>
        <Typography sx={{ p: 1 }} variant="h5">
          FitFriend
        </Typography>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Button1</Button>
        <Button color="inherit">Button2</Button>
        <Button color="inherit">About</Button>
      </Toolbar>
    </AppBar>
  );
}
