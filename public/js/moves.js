function genLegalMove(board, movelist) {
  resetMoveList();
  if (board.sideToPlay === COLOR.WHITE) {
    whitePawnMovesGen(board);
  }
  if (board.sideToPlay === COLOR.BLACK) {
    blackPawnMovesGen(board);
  }
  knightMovesGen(board, movelist);
  bishopMovesGen(board);
  rookMovesGen(board);
  queenMovesGen(board);
  kingMovesGen(board);
  // console.log(MOVELIST)
}

function resetMoveList() {
  for (const key in MOVELIST) {
    MOVELIST[key] = [];
  }
}

function whitePawnMovesGen(board) {
  const pawnPosn = PIECE_LIST["wP"];

  pawnPosn.forEach((currentPosn) => {
    const nextPosns = [];
    let nextPosn = currentPosn + 10;
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

// function knightMovesGen(board, opponentMoveList, squaresCopy) {
//   const knightPosns =
//     board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wN"] : PIECE_LIST["bN"];
//   knightPosns.forEach((currentPosn) => {
//     const nextPosns = [];
//     KNIGHT_MOVES.forEach((knightMove) => {
//       nextPosn = currentPosn + knightMove;
//       if (
//         PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay &&
//         board.squares[nextPosn] !== SQUARES.OFFBOARD
//       ) {
//         console.log(
//           selfKingCheck(squaresCopy, opponentMoveList, currentPosn, nextPosn),
//         );
//         // console.log("not check in " + nextPosn)
//         nextPosns.push(nextPosn);
//       }
//     });
//     MOVELIST[currentPosn] = nextPosns;
//   });
// }

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
          nextPosns.push(nextPosn);
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
          nextPosns.push(nextPosn);
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
          nextPosns.push(nextPosn);
        }
      }
    }
    MOVELIST[currentPosn] = nextPosns;
  });
}

function kingMovesGen(board) {
  const kingPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wK"] : PIECE_LIST["bK"];
  kingPosns.forEach((currentPosn) => {
    const nextPosns = [];
    QUEEN_MOVES.forEach((kingMove) => {
      nextPosn = currentPosn + kingMove;
      if (
        PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay &&
        board.squares[nextPosn] !== SQUARES.OFFBOARD
      ) {
        nextPosns.push(nextPosn);
      }
    });

    ///white king castle moves gen
    if (board.sideToPlay === COLOR.WHITE) {
      if (CASTLE_PERM.WKCA) {
        if (
          board.squares[SQUARES.f1] === PIECES.EMPTY &&
          board.squares[SQUARES.g1] === PIECES.EMPTY
        ) {
          nextPosns.push(SQUARES.g1);
        }
      }
      if (CASTLE_PERM.WQCA) {
        if (
          board.squares[SQUARES.b1] === PIECES.EMPTY &&
          board.squares[SQUARES.c1] === PIECES.EMPTY &&
          board.squares[SQUARES.d1] === PIECES.EMPTY
        ) {
          nextPosns.push(SQUARES.c1);
        }
      }
    }

    ///black king castle moves gen
    if (board.sideToPlay === COLOR.BLACK) {
      if (CASTLE_PERM.BKCA) {
        if (
          board.squares[SQUARES.f8] === PIECES.EMPTY &&
          board.squares[SQUARES.g8] === PIECES.EMPTY
        ) {
          nextPosns.push(SQUARES.g8);
        }
      }
      if (CASTLE_PERM.BQCA) {
        if (
          board.squares[SQUARES.b8] === PIECES.EMPTY &&
          board.squares[SQUARES.c8] === PIECES.EMPTY &&
          board.squares[SQUARES.d8] === PIECES.EMPTY
        ) {
          nextPosns.push(SQUARES.c8);
        }
      }
    }
    MOVELIST[currentPosn] = nextPosns;
  });
}

function opponentKingCheck(board, toSquare, fromSquare, selfMoveList) {
  board.resetPieceList();
  board.genPieceList();
  genLegalMove(board);
  const kingPosn =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["bK"] : PIECE_LIST["wK"];
  for (const key in MOVELIST) {
    const moveLists = MOVELIST[key];
    moveLists.forEach((moveList) => {
      if (selfMoveList !== undefined) {
        if (moveList === parseInt(kingPosn)) {
          // console.log(typeof (fromSquare), toSquare)
          console.log(selfMoveList[fromSquare])
        }
      }
    });
  }
}


function knightMovesGen(board, movelist) {
  const knightPosns =
    board.sideToPlay == COLOR.WHITE ? PIECE_LIST["wN"] : PIECE_LIST["bN"];
  knightPosns.forEach((currentPosn) => {
    const nextPosns = [];
    KNIGHT_MOVES.forEach((knightMove) => {
      nextPosn = currentPosn + knightMove;
      if (
        PIECES_COLOR[board.squares[nextPosn]] !== board.sideToPlay &&
        board.squares[nextPosn] !== SQUARES.OFFBOARD
      ) {
        if (movelist !== undefined) {
          // const selfPiece = board.squares[currentPosn];
          // const oppPiece = board.squares[nextPosn];
          // board.squares[nextPosn] = selfPiece;
          // board.squares[currentPosn] = PIECES.EMPTY;

          // selfKingCheck(board, movelist, nextPosn, currentPosn);

          // board.squares[nextPosn] = oppPiece
          // board.squares[currentPosn] = selfPiece;

          nextPosns.push(nextPosn);
        } else {
          nextPosns.push(nextPosn);
        }
      }
    });
    MOVELIST[currentPosn] = nextPosns;
  });
}

function checkCastlePerm(piece, fromSquare) {
  // white king
  if (piece === PIECES.wK) {
    CASTLE_PERM.WKCA = false;
    CASTLE_PERM.WQCA = false;
  }
  // black king
  if (piece === PIECES.bK) {
    CASTLE_PERM.BKCA = false;
    CASTLE_PERM.BQCA = false;
  }

  // white king side rook
  if (piece === PIECES.wR && parseInt(fromSquare) == SQUARES.h1) {
    CASTLE_PERM.WKCA = false;
  }
  // white queen side rook
  if (piece === PIECES.wR && parseInt(fromSquare) == SQUARES.a1) {
    CASTLE_PERM.WQCA = false;
  }

  //black king rook
  if (piece === PIECES.bR && parseInt(fromSquare) == SQUARES.h8) {
    CASTLE_PERM.BKCA = false;
  }
  // black queen side rook
  if (piece === PIECES.bR && parseInt(fromSquare) == SQUARES.a8) {
    CASTLE_PERM.BQCA = false;
  }
}

function castle(board, piece, toSquare) {
  //white king  castle
  if (piece === PIECES.wK) {
    if (CASTLE_PERM.WKCA === true && parseInt(toSquare) === SQUARES.g1) {
      board.squares[SQUARES.f1] = PIECES.wR;
      board.squares[SQUARES.h1] = PIECES.EMPTY;
    }
    if (CASTLE_PERM.WQCA === true && parseInt(toSquare) === SQUARES.c1) {
      board.squares[SQUARES.d1] = PIECES.wR;
      board.squares[SQUARES.a1] = PIECES.EMPTY;
    }
  }

  // black king castle
  if (piece === PIECES.bK) {
    if (CASTLE_PERM.BKCA === true && parseInt(toSquare) === SQUARES.g8) {
      board.squares[SQUARES.f8] = PIECES.bR;
      board.squares[SQUARES.h8] = PIECES.EMPTY;
    }
    if (CASTLE_PERM.BQCA === true && parseInt(toSquare) === SQUARES.c8) {
      board.squares[SQUARES.d8] = PIECES.bR;
      board.squares[SQUARES.a8] = PIECES.EMPTY;
    }
  }
}
