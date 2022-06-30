import Board from './Board.js'
const board = new Board()


board.visaualizeLegalMove(board)

function autoPlay(board) {
	board.element.addEventListener("click", function (event) {
		if (!board.clicked) {
			board.selectPieceToMove(board, event);
			board.clicked = !board.clicked;
		} else {
			board.clicked = !board.clicked;
			const piece = board.squares[board.fromSquare];
			const moveTo = event.target.id;

			if (Object.values(board.toSquares).includes(parseInt(moveTo))) {
				board.movePiece(board, piece, moveTo);
				board.check = false

				setTimeout(() => {
					// auto black move
					console.log("auto black move")
					let score = minimax(board, 2, -INFINITY, INFINITY, COLOR.BLACK)
					console.log(score)
					console.log(engineFrom, engineTo)
					movePiece(board, engineFrom, engineTo)
					// let piece = board.squares[engineFrom];
					// board.squares[engineTo] = piece;
					// board.squares[engineFrom] = PIECES.EMPTY;
					// board.check = false
					// if (piece === PIECES.wP || piece === PIECES.bP) {
					// 	promotePawn(board, piece, moveTo);
					// }
					// castle(board, piece, moveTo);
					// checkCastlePerm(piece, board.fromSquare);
					// opponentKingCheck(board);
					// board.genPieceList();
					// board.getPiecesOnBoard();

					// sideToPlay = COLOR.WHITE
					// genLegalMove(board)
				}, 100)
			}
		}
	});
}

// autoPlay(board)