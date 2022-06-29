function evaluatePosition(PIECE_LIST) {
	let score = 0;

	/// evaluate based on material count
	for (const key in PIECE_LIST) {
		piece = PIECES[key];
		piece_value = PIECES_VALUE[piece] * PIECE_LIST[key].length;
		if (PIECES_COLOR[piece] === COLOR.WHITE) {
			score -= piece_value;
		} else {
			score += piece_value;
		}
	}
	return score;
}

function minimax(board, depth, alpha, beta, side) {
	// let side = maxmizingPlayer
	sideToPlay = side;

	if (depth <= 0) {
		board.genPieceList(board, board.squares)
		eval = evaluatePosition(PIECE_LIST);
		return eval;
	}

	let position = [];
	for (const fromSquare in MOVELIST) {
		for (const toSquare of MOVELIST[fromSquare]) {
			let child_obj = {};
			child_obj[fromSquare] = toSquare;
			position.push(child_obj);
		}
	}

	if (sideToPlay == 1) {
		let maxEval = -INFINITY;
		for (node of position) {
			let fromSquare = parseInt(Object.keys(node));
			let toSquare = Object.values(node)[0];
			let squares = [...board.squares];
			movePiece(board, fromSquare, toSquare);
			let eval = minimax(board, depth - 1, alpha, beta, 1 - side);
			if (maxEval > eval) {
				engineFrom = fromSquare
				engineTo = toSquare
			}
			maxEval = Math.max(maxEval, eval);
			alpha = Math.max(alpha, eval)
			board.genPieceList(board, board.squares);
			resetPieces(board, squares);
			if (beta <= alpha) {
				break
			}

		}
		return maxEval;
	} else {
		let minEval = INFINITY;
		for (node of position) {
			let fromSquare = parseInt(Object.keys(node));
			let toSquare = Object.values(node)[0];
			let squares = [...board.squares];
			move(board, fromSquare, toSquare);
			let eval = minimax(board, depth - 1, alpha, beta, 1 - side);
			minEval = Math.min(minEval, eval);
			beta = Math.min(beta, eval)
			board.genPieceList(board, board.squares);
			resetPieces(board, squares);
			if (beta <= alpha) {
				break
			}
		}
		return minEval;
	}
}

function resetPieces(board, squares) {
	board.squares = squares;
	board.genPieceList();
}

function move(board, from, moveTo) {
	piece = board.squares[from];
	board.squares[moveTo] = piece;
	board.squares[from] = PIECES.EMPTY;
	board.check = false;
	if (piece === PIECES.wP || piece === PIECES.bP) {
		promotePawn(board, piece, moveTo);
	}
	castle(board, piece, moveTo);
	checkCastlePerm(piece, board.fromSquare);
	opponentKingCheck(board);
	checkOrStaleMate(board);
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

	MOVELIST = selfMoveList;
}

function movePiece(board, from, moveTo) {
	piece = board.squares[from];
	board.squares[moveTo] = piece;
	board.squares[from] = PIECES.EMPTY;
	board.check = false
	if (piece === PIECES.wP || piece === PIECES.bP) {
		promotePawn(board, piece, moveTo);
	}
	castle(board, piece, moveTo);
	checkCastlePerm(piece, board.fromSquare);
	opponentKingCheck(board);
	board.genPieceList();
	board.getPiecesOnBoard();

	//gen next move next
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

	board.printBoard();
	board.resetPieceList();
	board.genPieceList();
	MOVELIST = selfMoveList;

	checkOrStaleMate(board)
}