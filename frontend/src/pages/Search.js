import '../css/Search.css';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

function Search() {
  return (
    <div className='Search'>
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} >
          <Navbar />
        </Box>

        <Box sx={{ flexGrow: 1 }}>
            <p>Search page</p>

        </Box>
      
    </div>
  );
}

export default Search;