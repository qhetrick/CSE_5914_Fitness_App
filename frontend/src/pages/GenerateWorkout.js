import "../css/Search.css";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import MuscleGroupSelect from "../components/selects/MuscleGroupSelect";
import NumberOfDaysSelect from "../components/selects/NumberOfDaysSelect";
import EquipmentSelect from "../components/selects/EquipmentSelect";
import ExperienceLevelSelect from "../components/selects/ExperienceLevelSelect";
import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ExerciseTable({ workoutPlan }) {
  return (
    <Box sx={{ mt: 4, p: 2, width: "90%", margin: "0 auto" }}>
      {workoutPlan.map((day, index) => (
        <Accordion key={index} defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography
              variant="h5"
              sx={{ mt: 2, color: "black", textAlign: "center" }}
            >
              Day {index + 1}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer
              component={Paper}
              sx={{ borderRadius: 8, width: "100%" }}
            >
              <Table>
                <TableHead sx={{ background: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Exercise</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Level</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Muscle</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Equipment</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Preview</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      Repetitions & Sets
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {day.map((exercise) => (
                    <TableRow key={exercise._id}>
                      <TableCell>{exercise._source.name}</TableCell>
                      <TableCell>{exercise._source.level}</TableCell>
                      <TableCell>{exercise._source.muscle}</TableCell>
                      <TableCell>{exercise._source.equipment}</TableCell>
                      <TableCell>
                        <a
                          href={exercise._source.videoLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={exercise._source.previewSrc}
                            alt={exercise._source.name}
                            style={{
                              maxWidth: "100%",
                              maxHeight: "100px",
                              cursor: "pointer",
                            }}
                          />
                        </a>
                      </TableCell>
                      <TableCell>4x8-12</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}

function GenerateWorkout() {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [selectedDays, setSelectedDays] = useState("");
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

      // Group exercises by day
      const groupedExercises = groupExercisesByDay(data.results);
      console.log(data);
      setResultsData(groupedExercises);
      console.log(data.results);
    } catch (error) {
      // Catch any errors that occur during the fetch operation
      console.error(
        "There has been a problem with your fetch operation:",
        error
      );
    }
  }

  function groupExercisesByDay(exercises) {
    const groupedExercises = [];
    const maxDays = Math.min(7, exercises.length); // Limit to a maximum of 7 days

    for (let day = 0; day < maxDays; day++) {
      groupedExercises.push(exercises[day]);
    }

    return groupedExercises;
  }

  return (
    <div className="Search">
      <Box sx={{ flexGrow: 1, boxShadow: 3 }}>
        <Navbar />
      </Box>

      <Box sx={{ my: 5, flexGrow: 1, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{ color: "white", mb: 2, fontWeight: 700 }}
        >
          Redefine Your Workout.
        </Typography>
        <Typography variant="h5" sx={{ color: "white" }}>
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
        <ExperienceLevelSelect
          setSelectedExperienceLevels={setSelectedExperienceLevel}
        />
        <Typography
          variant="body1"
          style={{
            color: "white",
            alignItems: "center",
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

      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          target="_blank"
          rel="noreferrer"
          onClick={getExercises}
          sx={{ borderRadius: 20, padding: "12px 24px" }}
        >
          Generate Workout
        </Button>
      </Box>

      {/* Display fetched results */}
      {resultsData.length > 0 && <ExerciseTable workoutPlan={resultsData} />}
    </div>
  );
}

export default GenerateWorkout;
