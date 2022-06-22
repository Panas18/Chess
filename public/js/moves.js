function genLegalMove(board) {
  //generate white pawn moves
  if (board.sideToPlay === COLOR.WHITE) {
    let pawnPosn = PIECE_LIST["wP"];

    pawnPosn.forEach((currentPosn) => {
      let nextPosns = [];
      nextPosn = currentPosn + 10;
      if (
        board.squares[nextPosn] === PIECES.EMPTY &&
        board.squares[nextPosn] !== SQUARES.OFFBOARD
      ) {
        nextPosns.push(nextPosn);
      }

      if (currentPosn >= SECONDRANK_START && currentPosn <= SECONDRANK_END) {
        nextPosn = currentPosn + 20;
        if (board.squares[nextPosn] === PIECES.EMPTY && board.squares[nextPosn - 10] === PIECES.EMPTY) {
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
}
