import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import Home from "./Home.js";
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
        </Routes>
      </ThemeProvider>
    </Router>
  );
};
