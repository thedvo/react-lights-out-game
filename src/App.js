import React from 'react';
import Board from './Board';
import './App.css';

/** Simple app that just shows the LightsOut game. */

function App() {
	return (
		<div className="App">
			<Board />
			{/* <Board nrows={8} ncols={8} chanceLightStartsOn={0.5} /> */}
		</div>
	);
}

export default App;
