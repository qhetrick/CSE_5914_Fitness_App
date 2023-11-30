import "../css/Search.css";
import { Box, Grid, Typography, Button } from "@mui/material";
import Navbar from "../components/Navbar";
import MuscleGroupSelect from "../components/selects/MuscleGroupSelect";
import NumberOfDaysSelect from "../components/selects/NumberOfDaysSelect";
import EquipmentSelect from "../components/selects/EquipmentSelect";
import ExperienceLevelSelect from "../components/selects/ExperienceLevelSelect";
import React, { useState } from "react";
import VideoCard from "../components/VideoCard";

function GenerateWorkout() {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedDays, setSelectedDays] = useState('');
  const [resultsData, setResultsData] = useState([]);
  let testSearch = [];
  testSearch.push(
    { muscle: "abs" },
    { level: "beginner" },
    { equipment: "none" },
    { day: "2" }
  );

  async function getExercises() {
    let attributes = [];
    let categories = [];

    selectedMuscles.forEach((muscle) => {
      attributes.push(muscle);
      categories.push("muscle");
    });

      attributes.push(selectedExperienceLevel);
      categories.push("level");

    selectedEquipment.forEach((equipment) => {
      attributes.push(equipment);
      categories.push("equipment");
    });

      attributes.push(selectedDays);
      categories.push("day");

      
    try {
      // Fetch the data from the Flask server
      const response = await fetch("http://localhost:5000/genPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attributes: attributes,
          categories: categories,
        }),
      });

      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }

      // Wait for the promise to resolve and get the JSON data
      const data = await response.json();
      console.log(data);
      setResultsData(data.results);
      console.log(resultsData);
    } catch (error) {
      // Catch any errors that occur during the fetch operation
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  return (
    <div className="Search">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>

      <Box sx={{ my: 5, flexGrow: 1 }}>
        <Typography variant="h3" style={{ color: "white" }}>
          Redefine Your Workout.
        </Typography>
        <Typography sx={{ mt: 4 }} variant="h5" style={{ color: "white" }}>
          Personalize your generated routine by filling in the options below.
        </Typography>
      </Box>

      <Box>
        <Typography variant="body1" style={{ color: "white" }}>
          How many days per week would you like your workout plan to be?
        </Typography>
        <NumberOfDaysSelect setSelectedDays={setSelectedDays} />
        <Typography variant="body1" style={{ color: "white" }}>
          What would you consider your experience level to be?
        </Typography>
        <ExperienceLevelSelect setSelectedExperienceLevels={setSelectedExperienceLevel} />
        <Typography
          variant="body1"
          style={{
            color: "white",
            alignItems: "center"
          }}
          justifyContent={"left"}
        >
          What equipment do you have reasonable access to? (Please select all)
        </Typography>
        <EquipmentSelect setSelectedEquipment={setSelectedEquipment} />
        <Typography variant="body1" style={{ color: "white" }}>
          Are there any muscle groups that you would NOT like to be included?
          (Please select all)
        </Typography>
        <MuscleGroupSelect setSelectedMuscles={setSelectedMuscles} />
      </Box>
      <br />
      <Box>
        <Button
          variant="contained"
          color="primary"
          size="large"
          target="_blank"
          rel="noreferrer"
          onClick={getExercises}
        >
          Generate Workout
        </Button>
      </Box>

      <Box
        sx={{ my: 3, mx: 3, height: "500px", width: "auto", overflow: "auto" }}
      >
        <Grid container>
          {resultsData.map((result) => (
            <Grid item key={result._source.name} xs={12} sm={6} md={4}>
              <Typography>{result._source.name}</Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}

export default GenerateWorkout;
