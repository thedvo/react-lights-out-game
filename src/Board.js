import React, { useState } from 'react';
import Cell from './Cell';
import './Board.css';

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/
// set default values for the props in case.
function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
	const [board, setBoard] = useState(createBoard());

	/** create a board nrows high/ncols wide, each cell randomly lit or unlit */
	function createBoard() {
		let initialBoard = [];

		// take the number of rows from the props, loop to create the rows
		for (let y = 0; y < nrows; y++) {
			let row = [];
			// for each row, push the number of columns
			// We will add TRUE/FALSE as values of the cells meaning if the light is ON/OFF
			// if value returned from Math.random is less than props.chanceLightStartsOn, set the cell to True, otherwise set to False.
			for (let x = 0; x < ncols; x++) {
				row.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(row);
		}
		// TODO: create array-of-arrays of true/false values
		return initialBoard;
	}

	function hasWon() {
		// TODO: check the board in state to determine whether the player has won.
		// use every() method to check every row in the board.
		// If every cell in all rows is set to FALSE, that means all lights are off.
		return board.every((row) => row.every((cell) => !cell));
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			// takes x & y coordinates and turns each of them into a number
			const [y, x] = coord.split('-').map(Number);

			const flipCell = (y, x, boardCopy) => {
				// if this coord is actually on board, flip it

				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// TODO: Make a (deep) copy of the oldBoard
			const boardCopy = oldBoard.map((row) => [...row]);

			// You can click on a cell to toggle that light — but it also toggles the light above it, to the left of it, to the right of it, and below it. (Cells on an edge or in the corner won’t flip as many lights, since they are missing some neighbors).

			// TODO: in the copy, flip this cell and the cells around it
			flipCell(y, x, boardCopy); // flips selected cell
			flipCell(y, x + 1, boardCopy); // flips right cell
			flipCell(y, x - 1, boardCopy); // flips left cell
			flipCell(y + 1, x, boardCopy); // flips above cell
			flipCell(y - 1, x, boardCopy); // flips below cell

			// TODO: return the copy
			return boardCopy;
		});
	}

	// if the game is won, just show a winning msg & render nothing else
	if (hasWon()) {
		return alert("Lights Out! You've won the game.");
	}
	// TODO
	// make table board
	let tableBoard = [];

	for (let y = 0; y < nrows; y++) {
		let row = [];
		for (let x = 0; x < ncols; x++) {
			// create a coordinate variable to keep track of each cell
			let coord = `${y}-${x}`;
			// in each row, push an instane of the Cell component
			// pass in a key, isLit, and flipCellsAround function.
			row.push(
				<Cell
					key={coord} // give cell a key for useState and REACT to keep track
					isLit={board[y][x]} // takes the value of the coordinate (TRUE/FALSE) to determine isLit
					flipCellsAroundMe={() => flipCellsAround(coord)} // pass function for child component to have access as the Cell component will be the one which handles the onClick event
				/>
			);
		}
		// once the component is created, push it to the tableBoard initialized above.
		// we use the y coordinate as the key for the row
		// use table row tags for the row
		tableBoard.push(<tr key={y}>{row}</tr>);
	}

	// return a table with the tableBoard as its contents
	// place the contents (trows) in a table body tag
	return (
		<div className="Board">
			<h1 className="Board-title">Light's Out!</h1>
			<b className="Board-rules">
				The puzzle is won when when all of the lights are turned off.
			</b>

			<p className="Board-rules">
				You can click on a cell to toggle that light — but it also toggles the
				light above it, to the left of it, to the right of it, and below it.
			</p>
			<table className="Board-gameboard">
				<tbody>{tableBoard}</tbody>
			</table>
		</div>
	);
}

export default Board;
