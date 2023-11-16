import "../css/Search.css";
import { Box, Button, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import MuscleGroupSelect from "../components/selects/MuscleGroupSelect";
import NumberOfDaysSelect from "../components/selects/NumberOfDaysSelect";
import EquipmentSelect from "../components/selects/EquipmentSelect";
import LevelSelect from "../components/selects/LevelSelect";
import React, { useState } from "react";

function GenerateWorkout() {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedDays, setSelectedDays] = useState([]);
  let testSearch = [];
  testSearch.push(
    { muscle: "abs" },
    { level: "beginner" },
    { equipment: "none" },
    { days: "2" }
  );

  async function getExercises() {
    let attributes = [];
    let categories = [];

    selectedMuscles.forEach((muscle) => {
      attributes.push(muscle);
      categories.push("muscle");
    });
    selectedLevels.forEach((level) => {
      attributes.push(level);
      categories.push("level");
    });
    selectedEquipment.forEach((equipment) => {
      attributes.push(equipment);
      categories.push("equipment");
    });
    selectedDays.forEach((day) => {
      attributes.push(day);
      categories.push("day");
    });

    try {
      // Fetch the data from the Flask server
      const response = await fetch("http://localhost:5000/filter", {
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
        <LevelSelect setSelectedLevels={setSelectedLevels} />
        <Typography
          variant="body1"
          style={{
            color: "white",
            alignItems: "center",
          }}
          justifyContent={"left"}
        >
          What equipment do you have reasonable access to? (Please select all)
          <EquipmentSelect setSelectedEquipment={setSelectedEquipment} />
        </Typography>
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
    </div>
  );
}

export default GenerateWorkout;
