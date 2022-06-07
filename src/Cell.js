import React from 'react';
import './Cell.css';

/** A single cell on the board.
 *
 * This has no state --- just two props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

// inherits flipCellsAroundMe function from parent component --> Board
// isLit is determined based on the value of selected coordinate (TRUE/FALSE)
function Cell({ flipCellsAroundMe, isLit }) {
	// ternary operator. Used to determine className for selected cell.
	const classes = `Cell ${isLit ? 'Cell-lit' : ''}`;

	// returns table data cell with className determined above. Runs onClick function
	return <td className={classes} onClick={flipCellsAroundMe} />;
}

export default Cell;
