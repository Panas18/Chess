
function evaluatePosition(PIECE_LIST) {

	let score = 0

	/// evaluate based on material count
	for (const key in PIECE_LIST) {
		piece = PIECES[key]
		piece_value = PIECES_VALUE[piece] * PIECE_LIST[key].length
		if (PIECES_COLOR[piece] === COLOR.WHITE) {
			score += piece_value
		} else {
			score -= piece_value
		}
	}
	// if (sideToPlay === COLOR.WHITE) {
	// 	console.log(score)
	// 	return score
	// } else {
	// 	console.log(-score)
	// 	return -score
	// }
	console.log(score)
	return score

}


function minimax(board, depth, maxmizingPlayer) {
	if (maxmizingPlayer === COLOR.WHITE) {
		for (const key in MOVELIST) {
			if (MOVELIST[key].length !== 0) {
				for (const toSquare of MOVELIST[key]) {
					let squares = movePiece(board, key, toSquare)
					resetPieces(board, squares)
				}
			}
		}
	}
}

function resetPieces(board, squares) {
	board.squares = squares
	board.resetPieceList();
	board.genPieceList();

}

function movePiece(board, from, moveTo) {
	let squares = [...board.squares]
	piece = board.squares[from]
	board.squares[moveTo] = piece;
	board.squares[from] = PIECES.EMPTY;
	board.check = false
	if (piece === PIECES.wP || piece === PIECES.bP) {
		promotePawn(board, piece, moveTo);
	}
	castle(board, piece, moveTo);
	checkCastlePerm(piece, board.fromSquare);
	opponentKingCheck(board);
	checkOrStaleMate(board)
	board.printBoard();
	// board.squares = squares
	// board.resetPieceList();
	// board.genPieceList();
	return squares
}