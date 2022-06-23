function genLegalMove(board) {
  if (board.sideToPlay === COLOR.WHITE) {
    whitePawnMovesGen(board);
  }
  if (board.sideToPlay === COLOR.BLACK) {
    blackPawnMovesGen(board);
  }
  knightMovesGen(board)

}

function knightMovesGen(board) {
  const KnightPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wN"] : PIECE_LIST["bN"];
  // console.log(KnightPosns)
  // Knight Movement
  KnightPosns.forEach((currentPosn) => {
    const nextPosns = [];
    KNIGHT_MOVES.forEach((knightMove) => {
      nextPosn = currentPosn + knightMove;
      // console.log(board.squares[nextPosn])
      if (
        PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay &&
        board.squares[nextPosn] !== SQUARES.OFFBOARD
      ) {
        nextPosns.push(nextPosn);
      }
    });
    // console.log(nextPosns)
    MOVELIST[currentPosn] = nextPosns;
  });
}


function whitePawnMovesGen(board) {
  const pawnPosn = PIECE_LIST["wP"];

  pawnPosn.forEach((currentPosn) => {
    const nextPosns = [];
    nextPosn = currentPosn + 10;
    if (
      board.squares[nextPosn] === PIECES.EMPTY &&
      board.squares[nextPosn] !== SQUARES.OFFBOARD
    ) {
      nextPosns.push(nextPosn);
    }

    if (currentPosn >= SQUARES.a2 && currentPosn <= SQUARES.h2) {
      nextPosn = currentPosn + 20;
      if (
        board.squares[nextPosn] === PIECES.EMPTY &&
        board.squares[nextPosn - 10] === PIECES.EMPTY
      ) {
        nextPosns.push(nextPosn);
      }
    }

    // capture squares
    capPositions = [currentPosn + 11, currentPosn + 9];
    capPositions.forEach((capPosn) => {
      if (
        PIECES_COLOR[board.squares[capPosn]] === COLOR.BLACK &&
        board.squares[nextPosn] !== SQUARES.OFFBOARD
      ) {
        nextPosns.push(capPosn);
      }
    });
    MOVELIST[currentPosn] = nextPosns;
  });
}

function blackPawnMovesGen(board) {
  const pawnPosn = PIECE_LIST["bP"];
  pawnPosn.forEach((currentPosn) => {
    const nextPosns = [];
    nextPosn = currentPosn - 10;
    if (
      board.squares[nextPosn] === PIECES.EMPTY &&
      board.squares[nextPosn] !== SQUARES.OFFBOARD
    ) {
      nextPosns.push(nextPosn);
    }

    if (currentPosn >= SQUARES.a7 && currentPosn <= SQUARES.h7) {
      nextPosn = currentPosn - 20;
      if (
        board.squares[nextPosn] === PIECES.EMPTY &&
        board.squares[nextPosn + 10] === PIECES.EMPTY
      ) {
        nextPosns.push(nextPosn);
      }
    }

    // capture squares
    capPositions = [currentPosn - 11, currentPosn - 9];
    capPositions.forEach((capPosn) => {
      if (
        PIECES_COLOR[board.squares[capPosn]] === COLOR.WHITE &&
        board.squares[nextPosn] !== SQUARES.OFFBOARD
      ) {
        nextPosns.push(capPosn);
      }
    });
    MOVELIST[currentPosn] = nextPosns;
  });
}
