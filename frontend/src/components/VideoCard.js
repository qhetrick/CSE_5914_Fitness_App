import {
  Card,
  Button,
  Container,
  Grid,
  CardContent,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import React from "react";

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

function VideoCard({ title, description, image, videoLink }) {
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <Grid
          container
          spacing={1}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{
            minHeight: "60vh",
            minWidth: "60vh",
            maxHeight: "60vh",
            maxWidth: "60vh",
          }}
          item
          xs={12}
          sm={6}
        >
          <Grid item>
            <Card
              elevation={3}
              color="#f45d05"
              style={{
                minHeight: "50vh",
                minWidth: "50vh",
                maxHeight: "50vh",
                maxWidth: "50vh",
                boxShadow: 3,
              }}
            >
              <CardContent sx={{ color: "#666370" }}>
                <Typography variant="h5" color="#666370">
                  {title}
                </Typography>
              </CardContent>
              <div className="image-container">
                <img src={image} alt="" />
              </div>
              <div className="card-content">
                <div className="card-description">
                  <br />
                  <Typography variant="body1" color="#666370">
                    {description}
                  </Typography>
                  <br />
                </div>
                <div className="card-button">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    href={videoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Watch Video
                  </Button>
                </div>
              </div>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </Container>
  );
}

export default VideoCard;
