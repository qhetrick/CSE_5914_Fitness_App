import '../css/App.css';
import '../css/VideoCard.css';
import CSVDisplay from '../components/CSVDisplay';
import { Box } from '@mui/material';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <div className='App'>
        <Box sx={{ flexGrow: 1, boxShadow: 3 }} >
          <Navbar />
        </Box>
      <CSVDisplay />
    </div>
  );
}

export default Home;