import { Card } from "@mui/material";
import React from "react";

function VideoCard({ title, description, image, videoLink }) {
    return (

        <div className="card-container">
            <div className="image-container">
                <img src={image} alt="" />
            </div>
            <div className="card-content">
                <div className="card-title">
                    <h3>{title}</h3>
                </div>
                <div className="card-description">
                    <p>{description}</p>
                </div>
            </div>
            <div className="card-button">
                <button>
                    <a href={videoLink} target="_blank" rel="noreferrer">Watch Video</a>
                </button>
            </div>
            <Card
                title={title}
                description={description}
                image={image}
            />
        </div>
    )
}

export default VideoCard;