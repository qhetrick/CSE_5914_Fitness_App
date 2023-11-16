import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Home from "./Home.js";
import Exercises from "./Exercises.js";
import About from "./About.js";
import Team from "./Team.js";
import { ThemeProvider } from "@emotion/react";

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

export const Pages = () => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/team" element={<Team />}></Route>
        </Routes>
      </ThemeProvider>
    </Router>
  );
};
