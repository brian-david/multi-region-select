import { Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import './App.css';
import DrawAnnotations from './comconents/drawing-canvas';
import { ChangeState } from './drawState';

function App() {
<<<<<<< HEAD
  const [alignment, setAlignment] = React.useState('web');
  const handleChange = (event: any, newAlignment: any) => {
    setAlignment(newAlignment);
    return (
      <div>
        <h1>This is a persistent drawing area example</h1>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="web">Create</ToggleButton>
          <ToggleButton value="android">Edit</ToggleButton>
        </ToggleButtonGroup>
        <DrawAnnotations></DrawAnnotations>
      </div>
    );
  }
=======
  return (
    <div>
      <h1>This is a persistent drawing area example</h1>
      <ChangeState></ChangeState>
      <DrawAnnotations></DrawAnnotations>
    </div>
  );
}
>>>>>>> 1de9528677d929e58431dc9baf067cd99ab2aaf2

  export default App;