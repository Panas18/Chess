const optionWrapper = document.getElementsByClassName("option-wrapper")[0];
const gameWrapper = document.getElementsByClassName("game-wrapper")[0];
const resignWrapper = document.getElementsByClassName("resign--wrapper")[0];
const endWrapper = document.getElementsByClassName("end--wrapper")[0];

const rightContainer = document.getElementsByClassName("right--container")[0];
const gameContainer = document.getElementsByClassName("game--container")[0];
const resignContainer = document.getElementsByClassName("resign--container")[0];
const endContainer = document.getElementsByClassName("end--container")[0];


import Board from "./Board.js";
import Timer from "./Time.js";
const board = new Board();

function resign(side) {
	let color = side == COLOR.WHITE ? "Black" : "White"
	let endMessage = `${color} won by resignation`
	endContainer.innerHTML = endMessage
	resignWrapper.style.display = "none"
	endWrapper.style.display = "block"
}

resignContainer.addEventListener("click", function (event) {
	let option = event.target.id;
	switch (option) {
		case "yes":
			resign(board.sideToPlay)
			break;
		case "no":
			resignWrapper.style.display = "none"
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
			break;
		case "draw":
			console.log("draw")
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
			blackTimer.timerCycle()
		} else {
			blackTimer.pause = false
			whiteTimer.timerCycle()
		}
		whiteTimeDisplay.innerHTML = `${whiteTimer.min}:${whiteTimer.second}`
		blackTimeDisplay.innerHTML = `${blackTimer.min}:${blackTimer.second}`
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

