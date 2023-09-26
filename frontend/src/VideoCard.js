import { Card, Button, Container, Grid, CardContent, Typography } from "@mui/material";
import { createTheme } from '@mui/material/styles';

import React from "react";

const theme = createTheme({
    palette: {
        primary: {
            main: '#ff2400'
        },
        secondary: {
            main: '#808080'
        },
    },
});

function VideoCard({ title, description, image, videoLink }) {
    return (
        <Container>
            <Grid container spacing={1} direction="column" alignItems="center" justifyContent="center" style={{ minHeight: '60vh', minWidth: '60vh', maxHeight: '60vh', maxWidth: '60vh' }} item xs={12} sm={6}>
                <Grid item>
                    <Card elevation={3} style={{ minHeight: '50vh', minWidth: '50vh', maxHeight: '50vh', maxWidth: '50vh' }}>
                        <CardContent>
                            <Typography variant="h5" color="primary" >
                                {title}
                            </Typography>
                        </CardContent>
                        <div className="image-container">
                            <img src={image} alt="" />
                        </div>
                        <div className="card-content">
                            <div className="card-description">
                                <br />
                                <p>{description}</p>
                                <br />
                            </div>
                            <div className="card-button">
                                <Button variant="outlined" color="primary" size="large" href={videoLink} target="_blank" rel="noreferrer">
                                    Watch Video
                                </Button>
                            </div>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}

export default VideoCard;