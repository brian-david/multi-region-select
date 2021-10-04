import { Switch, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import './App.css';
import DrawAnnotations from './comconents/drawing-canvas';

function App() {
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
}

export default App;