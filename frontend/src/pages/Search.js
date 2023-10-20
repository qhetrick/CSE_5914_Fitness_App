import '../css/Search.css';
import { Box, Typography } from '@mui/material';
import Navbar from '../components/Navbar';

function Search() {
  return (
    <div className='Search'>
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} >
          <Navbar />
        </Box>

        <Box sx={{ mt: 5, flexGrow: 1 }}>
            <Typography variant='h3' style={{color: 'white'}}>Redefine Your Workout.</Typography>
            

        </Box>
      
    </div>
  );
}

export default Search;