import './App.css';
import './VideoCard.css';
import CSVDisplay from './CSVDisplay';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f45d05',
      dark: '#f45d05'
    },

    secondary: {
      main: '#f45d05',
      dark: '#f45d05'
    }
  }
});

function App() {
  return (
    <div className='App'>
        <Box sx={{ flexGrow: 1 }} >
          <AppBar  theme={theme} color='primary' position='static'>
            <Toolbar>
              <Typography sx={{ p: 1 }} variant='h5'>FitFriend</Typography>
              <Button color='inherit'>Home</Button>
              <Button color='inherit'>Button1</Button>
              <Button color='inherit'>Button2</Button>
              <Button color='inherit'>About</Button>
              <Button color='inherit'href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noreferrer' >Click me</Button>
            </Toolbar>
          </AppBar>
        </Box>
      <CSVDisplay />
    </div>
  );
}

export default App;