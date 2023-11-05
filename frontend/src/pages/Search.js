import '../css/Search.css';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import MuscleGroupSelect from '../components/selects/MuscleGroupSelect';
import LevelSelect from '../components/selects/LevelSelect';


function Search() {

  let testSearch = [];
  testSearch.push( {"muscle": "abs"}, {"level": "beginner"}, {"equipment": "none"} );
  console.log(testSearch);

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
          <MuscleGroupSelect/>
          <LevelSelect/>
        </Box>
    </div>
  );
}

export default Search;
