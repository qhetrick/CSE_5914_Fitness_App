import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6a1b9a',
      dark: '#6a1b9a'
    },

    secondary: {
      main: '#6a1b9a',
      dark: '#6a1b9a'
    }
  }
});

function App() {
  return (
    <div className="App-header" >
        <Box sx={{ flexGrow: 1 }} >
          <AppBar  theme={theme} color="primary" position="static">
            <Toolbar>
              <Typography sx={{ p: 1 }} variant='h5'>FitFriend</Typography>
              <Button color="inherit">Home</Button>
              <Button color="inherit">Button1</Button>
              <Button color="inherit">Button2</Button>
              <Button color="inherit">About</Button>
            </Toolbar>
          </AppBar>
        </Box>
    </div>

    
  );
}

export default App;
