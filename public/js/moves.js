function genLegalMove(board) {
  if (board.sideToPlay === COLOR.WHITE) {
    whitePawnMovesGen(board);
  }
  if (board.sideToPlay === COLOR.BLACK) {
    blackPawnMovesGen(board);
  }
  knightMovesGen(board);
  bishopMovesGen(board);
  rookMovesGen(board);
  queenMovesGen(board)
  kingMovesGen(board)
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

function knightMovesGen(board) {
  const knightPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wN"] : PIECE_LIST["bN"];
  // console.log(KnightPosns)
  // Knight Movement
  knightPosns.forEach((currentPosn) => {
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

function bishopMovesGen(board) {
  const bishopPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wB"] : PIECE_LIST["bB"];
  bishopPosns.forEach((currentPosn) => {
    const nextPosns = [];
    // console.log(currentPosn)
    for (let i = 0; i < BISHOP_MOVES.length; i++) {
      nextPosn = currentPosn + BISHOP_MOVES[i];
      while (
        board.squares[nextPosn] !== SQUARES.OFFBOARD &&
        board.squares[nextPosn] === PIECES.EMPTY
      ) {
        nextPosns.push(nextPosn);
        nextPosn = nextPosn + BISHOP_MOVES[i];
      }
      if (board.squares[nextPosn] !== SQUARES.OFFBOARD) {
        // if (PIECES_COLOR[board.squares[nextPosn]] !== board.sidetoplay) {
        // }
        if (PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay) {
          nextPosns.push(nextPosn)
        }
      }
    }
    MOVELIST[currentPosn] = nextPosns;
  });
}

function rookMovesGen(board) {
  const rookPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wR"] : PIECE_LIST["bR"];
  rookPosns.forEach((currentPosn) => {
    const nextPosns = [];
    // console.log(currentPosn)
    for (let i = 0; i < ROOK_MOVES.length; i++) {
      nextPosn = currentPosn + ROOK_MOVES[i];
      while (
        board.squares[nextPosn] !== SQUARES.OFFBOARD &&
        board.squares[nextPosn] === PIECES.EMPTY
      ) {
        nextPosns.push(nextPosn);
        nextPosn = nextPosn + ROOK_MOVES[i];
      }
      if (board.squares[nextPosn] !== SQUARES.OFFBOARD) {
        if (PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay) {
          nextPosns.push(nextPosn)
        }
      }
    }
    MOVELIST[currentPosn] = nextPosns;
  });
}

function queenMovesGen(board) {
  const queenPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wQ"] : PIECE_LIST["bQ"];
  queenPosns.forEach((currentPosn) => {
    const nextPosns = [];
    // console.log(currentPosn)
    for (let i = 0; i < QUEEN_MOVES.length; i++) {
      nextPosn = currentPosn + QUEEN_MOVES[i];
      while (
        board.squares[nextPosn] !== SQUARES.OFFBOARD &&
        board.squares[nextPosn] === PIECES.EMPTY
      ) {
        nextPosns.push(nextPosn);
        nextPosn = nextPosn + QUEEN_MOVES[i];
      }
      if (board.squares[nextPosn] !== SQUARES.OFFBOARD) {
        if (PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay) {
          nextPosns.push(nextPosn)
        }
      }
    }
    MOVELIST[currentPosn] = nextPosns;
  });
}

function kingMovesGen(board) {
  const kingPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wK"] : PIECE_LIST["bK"];
  // console.log(KnightPosns)
  // Knight Movement
  kingPosns.forEach((currentPosn) => {
    const nextPosns = [];
    QUEEN_MOVES.forEach((kingMove) => {
      nextPosn = currentPosn + kingMove;
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