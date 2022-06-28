
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

function minimax(board, depth, side) {
	sideToPlay = side

	if (depth <= 0) {
		console.log("depth complete")
		return 0
	}

	for (node of position) {
		fromSquare = parseInt(Object.keys(node))
		toSquare = Object.values(node)[0]
		var squares = [...board.squares]
		movePiece(board, fromSquare, toSquare)
		minimax(board, depth - 1, 1 - side)
		resetPieces(board, squares)
	}
}

function resetPieces(board, squares) {
	board.squares = squares
	board.genPieceList();

}

function movePiece(board, from, moveTo) {
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

	// gen next move next
	sideToPlay = 1 - sideToPlay;
	genLegalMove(board);

	//check if piecemove leads to check
	const selfMoveList = { ...MOVELIST };

	for (const key in selfMoveList) {
		selfMoveList[key].forEach((toSquare) => {
			let selfPiece = board.squares[key];
			let toSquarePiece = board.squares[toSquare];
			board.squares[toSquare] = selfPiece;
			board.squares[key] = PIECES.EMPTY;

			sideToPlay = 1 - sideToPlay;
			genLegalMove(board);
			selfKingCheck(board, toSquare, key, selfMoveList);
			board.squares[toSquare] = toSquarePiece;
			board.squares[key] = selfPiece;
			sideToPlay = 1 - sideToPlay;
		});
	}

	MOVELIST = selfMoveList
}