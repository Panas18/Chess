
import Board from "./Board.js";
import Timer from "./Time.js";
const board = new Board();


resignContainer.addEventListener("click", function (event) {
	let option = event.target.id;
	switch (option) {
		case "yes":
			resign(resignBy)
			break;
		case "no":
			resignWrapper.style.display = "none"
			gameWrapper.style.display = "block"
			break;
		default:
			break;
	}
});

drawContainer.addEventListener("click", function (event) {
	let option = event.target.id;
	switch (option) {
		case "yes":
			draw()
			break;
		case "no":
			drawWrapper.style.display = "none"
			gameWrapper.style.display = "block"
			break;
		default:
			break;
	}
});

gameContainer.addEventListener("click", function (event) {
	let option = event.target.id;
	switch (option) {
		case "resign":
			gameWrapper.style.display = "none"
			resignWrapper.style.display = "block"
			resignBy = board.sideToPlay
			break;
		case "draw":
			gameWrapper.style.display = "none"
			drawWrapper.style.display = "block"
			break;
		default:
			break;
	}
});

rightContainer.addEventListener("click", function (event) {
	let playOption = parseInt(event.target.id);
	switch (playOption) {
		case 1:
			humanGamePlay(3)
			break;
		case 2:
			humanGamePlay(5)
			break;
		case 3:
			humanGamePlay(10)
			break;
		case 4:
			optionWrapper.style.display = "none"
			gameWrapper.style.display = "block"
			autoPlay(board, 1)
			break;

		default:
			break;
	}
});

function humanGamePlay(timeControl) {
	optionWrapper.style.display = "none"
	gameWrapper.style.display = "block"
	const blackTimer = new Timer(timeControl)
	const whiteTimer = new Timer(timeControl)
	board.visaualizeLegalMove(board)
	setInterval(() => {
		if (board.sideToPlay === COLOR.BLACK) {
			whiteTimer.pause = false
			blackTimer.timerCycle(board)
		} else {
			blackTimer.pause = false
			whiteTimer.timerCycle(board)
		}
		whiteTimeDisplay.innerHTML = `White: ${whiteTimer.min}:${whiteTimer.second}`
		blackTimeDisplay.innerHTML = `Black: ${blackTimer.min}:${blackTimer.second}`
	}, 1000)

}



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
				board.check = false;

				setTimeout(() => {
					// auto black move
					console.log("auto black move");
					let score = minimax(board, 2, -INFINITY, INFINITY, COLOR.BLACK);
					console.log(score);
					console.log(engineFrom, engineTo);
					movePiece(board, engineFrom, engineTo);
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
				}, 100);
			}
		}
	});
}


function resign(side) {
	let color = side == COLOR.WHITE ? "Black" : "White"
	let endMessage = `${color} won by resignation`
	endContainer.innerHTML = endMessage
	resignWrapper.style.display = "none"
	endWrapper.style.display = "block"
	MOVELIST = {}
}

function draw() {
	let drawMessage = "Draw by Aggrement"
	endContainer.innerHTML = drawMessage
	drawWrapper.style.display = "none"
	endWrapper.style.display = "block"
	MOVELIST = {}
}