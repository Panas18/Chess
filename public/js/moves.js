function genLegalMove(board) {
  //generate white pawn moves
  if (board.sideToPlay === COLOR.WHITE) {
    whitePawnMovesGen(board);
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

    if (currentPosn >= SECONDRANK_START && currentPosn <= SECONDRANK_END) {
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
