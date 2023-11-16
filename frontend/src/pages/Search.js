import '../css/Search.css';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import MuscleGroupSelect from '../components/selects/MuscleGroupSelect';
import LevelSelect from '../components/selects/LevelSelect';
import EquipmentSelect from '../components/selects/EquipmentSelect';
import { Button } from '@mui/material';
import React, { useState } from 'react';

function Search() {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  let testSearch = [];
  testSearch.push( {"muscle": "abs"}, {"level": "beginner"}, {"equipment": "none"} );

  async function getExercises() {
    let attributes=[];
    let categories=[];

    selectedMuscles.forEach((muscle) => {
      attributes.push(muscle);
      categories.push('muscle')
    })
    selectedLevels.forEach((level) => {
      attributes.push(level);
      categories.push('level')
    })
    selectedEquipment.forEach((equipment) => {
      attributes.push(equipment);
      categories.push('equipment');
    })

    try {
      // Fetch the data from the Flask server
      const response = await fetch("http://localhost:5000/filter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({
          attributes: attributes,
          categories: categories
        })
      });
  
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok: ' + response.statusText);
      }
  
      // Wait for the promise to resolve and get the JSON data
      const data = await response.json();
    } catch (error) {
      // Catch any errors that occur during the fetch operation
      console.error('There has been a problem with your fetch operation:', error);
    }
  }

  return (
    <div className='Search'>
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} >
          <Navbar />
        </Box>

        <Box sx={{ my: 5, flexGrow: 1 }}>
          <Typography variant='h3' style={{color: 'white'}}>Redefine Your Workout.</Typography>
          <Typography sx={{mt: 4}}variant='h5' style={{color: 'white'}}>Personalize your generated routine by filling in the options below.</Typography>
        </Box>
      
        <Box>
          <MuscleGroupSelect setSelectedMuscles={setSelectedMuscles}/>
          <LevelSelect setSelectedLevels={setSelectedLevels}/>
          <EquipmentSelect setSelectedEquipment={setSelectedEquipment}/>
          <Button onClick={getExercises}>
          Click Me!
        </Button>
        </Box>  
    </div>
  );
}

export default Search;
