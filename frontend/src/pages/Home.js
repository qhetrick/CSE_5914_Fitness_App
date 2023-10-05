import "../css/App.css";
import "../css/VideoCard.css";
import CSVDisplay from "../components/CSVDisplay";
import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#f45d05",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f45d05",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function Home() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
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
      </Box>
      <CSVDisplay />
    </div>
  );
}

export default Home;
