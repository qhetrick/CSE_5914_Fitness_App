import logo from './logo.svg';
import Button from '@mui/material/Button';
import './App.css';
import './VideoCard.css';
import CSVDisplay from './CSVDisplay';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload muthaaaa.
        </p>
        <br></br>
        <Button variant="contained" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Button>
        <br />
        <Button href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel="noreferrer" >
          Click me
        </Button>
      </header>
      <CSVDisplay />
    </div>
  );
}

export default App;
