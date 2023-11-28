import '../css/Search.css';
import { Box, Grid, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import MuscleGroupSelect from '../components/selects/MuscleGroupSelect';
import LevelSelect from '../components/selects/LevelSelect';
import EquipmentSelect from '../components/selects/EquipmentSelect';
import { Button } from '@mui/material';
import React, { useState } from 'react';
import VideoCard from '../components/VideoCard';

function SearchForExercises() {
  const [selectedMuscles, setSelectedMuscles] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [resultsData, setResultsData] = useState([]);
  //TODO Remove Test Search
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
      console.log(data)
      setResultsData(data.results);
      console.log(resultsData);
      // console.log(data.results[0]._source.name)
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
          <Typography sx={{mt: 4}}variant='h5' style={{color: 'white'}}>Fill in the options below to view possible exercises.</Typography>
        </Box>
      
        <Box>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6} md={4} lf={3}>
              <MuscleGroupSelect setSelectedMuscles={setSelectedMuscles}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lf={3}>
              <LevelSelect setSelectedLevels={setSelectedLevels}/>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lf={3}>
            <EquipmentSelect setSelectedEquipment={setSelectedEquipment}/>
            </Grid>
          </Grid>
          <Button variant='contained' onClick={getExercises}>
            Submit
          </Button>
        </Box>

        <Box sx={{my: 3, mx: 3,  height: '500px', width: 'auto', overflow: "auto"}}>
          <Grid container>
          {resultsData.map((result) => (
                <Grid item key={result._source.name} xs={12} sm={6} md={4}>
                  <VideoCard
                    title={result._source.name}
                    description={result._source.muscle}
                    image={result._source.previewSrc}
                    videoLink={result._source.videoLink}
                  />
                </Grid>
              ))}
          </Grid>
        </Box>
    </div>
  );
}

export default SearchForExercises;
