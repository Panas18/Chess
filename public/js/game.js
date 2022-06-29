import Board from './Board.js'
const board = new Board()


// board.visaualizeLegalMove(board)

function autoPlay(board) {
	board.element.addEventListener("click", function (event) {
		if (!board.clicked) {
			board.selectPieceToMove(board, event);
			board.clicked = !board.clicked;
		} else {
			board.clicked = !board.clicked;

			const piece = board.squares[board.fromSquare];
			const moveTo = event.target.id;

			board.movePiece(board, piece, moveTo);
			board.check = false
			board.resetSqColor();
			board.genPieceList()
			board.getPiecesOnBoard()
			console.log(PIECE_LIST)
			// genLegalMove(board)


			// setTimeout(() => {
			// 	// auto black move
			// 	sideToPlay
			// 	let squares = [...board.squares]
			// 	let score = minimax(board, 2, -INFINITY, INFINITY, COLOR.BLACK)
			// 	console.log(score)
			// 	board.squares = squares
			// 	movePiece(board, engineFrom, engineTo)
			// 	board.genPieceList()
			// 	board.getPiecesOnBoard()

			// }, 100)
		}
	});
}

autoPlay(board)