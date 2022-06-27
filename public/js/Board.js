export default class Board {
  constructor() {
    this.enPassant = 0;
    this.capture = false;
    this.clicked = false;
    this.check = false;
    this.toSquare = 0;
    this.fromSquare = 0;
    this.sideToPlay = COLOR.NONE;
    this.squares = Array(TOTAL_SQ_NUM);
    this.boardIndex = gen64arrayIndex();
    this.element = document.querySelector("#chess--board");
    this.initFileRank();
    this.initBoard();
    this.parseFEN(STARTING_POSITION);
    this.drawBoard();
    this.genPieceList();
    this.printBoard();
  }

  drawBoard() {
    for (let rank = RANK.RANK_8; rank >= RANK.RANK_1; rank--) {
      for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
        let sq = FR2SQ(file, rank);
        let color =
          (rank % 2 === 0 && file % 2 === 0) || (rank % 2 != 0 && file % 2 != 0)
            ? "dark"
            : "light";
        let square = new Square(rank, file, color, sq);
        this.element.appendChild(square.element);
      }
    }
  }

  initFileRank() {
    for (let i = 0; i < TOTAL_SQ_NUM; i++) {
      FILE_ARRAY[i] = SQUARES.OFFBOARD;
      RANK_ARRAY[i] = SQUARES.OFFBOARD;
    }
    for (let rank = RANK.RANK_1; rank <= RANK.RANK_8; rank++) {
      for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
        let sq = FR2SQ(file, rank);
        FILE_ARRAY[sq] = file;
        RANK_ARRAY[sq] = rank;
      }
    }
  }

  initBoard() {
    // make every squares value as offboard value
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i] = SQUARES.OFFBOARD;
    }

    //make board squares empty at first
    this.boardIndex.forEach((index) => {
      this.squares[index] = PIECES.EMPTY;
    });
  }

  printBoard() {
    for (let rank = RANK.RANK_8; rank >= RANK.RANK_1; rank--) {
      let line = RANK_CHAR[rank] + "  ";
      for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
        let square = FR2SQ(file, rank);
        let piece = this.squares[square];
        line += " " + PIECE_CHAR[piece] + " ";
      }
      console.log(line);
    }
    let line = "   ";
    for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
      line += " " + FILE_CHAR[file] + " ";
    }
    console.log("");
    console.log(line);

    console.log("To Play: " + side[this.sideToPlay]);
    let enPassantChar = Object.keys(SQUARES).find(
      (k) => SQUARES[k] === this.enPassant,
    );
    if (typeof enPassantChar == "undefined") {
      enPassantChar = "None";
    }
    console.log("EnPassant Square: " + enPassantChar);

    line = "";
    Object.keys(CASTLE_PERM).forEach((key, index) => {
      if (CASTLE_PERM[key]) line += CASTLE_CHAR[index];
    });
    console.log("Castle Permission: " + line);
  }

  parseFEN(fenString) {
    let index = 0;
    let fenIndex = 0;
    while (index < 64 && fenIndex <= fenString.length) {
      let switchValue = [...fenString][fenIndex];
      switch (switchValue) {
        //black pieces
        case "r":
          this.squares[this.boardIndex[index]] = PIECES.bR;
          break;
        case "n":
          this.squares[this.boardIndex[index]] = PIECES.bN;
          break;
        case "b":
          this.squares[this.boardIndex[index]] = PIECES.bB;
          break;
        case "q":
          this.squares[this.boardIndex[index]] = PIECES.bQ;
          break;
        case "k":
          this.squares[this.boardIndex[index]] = PIECES.bK;
          break;
        case "p":
          this.squares[this.boardIndex[index]] = PIECES.bP;
          break;
        // white pieces
        case "R":
          this.squares[this.boardIndex[index]] = PIECES.wR;
          break;
        case "N":
          this.squares[this.boardIndex[index]] = PIECES.wN;
          break;
        case "B":
          this.squares[this.boardIndex[index]] = PIECES.wB;
          break;
        case "Q":
          this.squares[this.boardIndex[index]] = PIECES.wQ;
          break;
        case "K":
          this.squares[this.boardIndex[index]] = PIECES.wK;
          break;
        case "P":
          this.squares[this.boardIndex[index]] = PIECES.wP;
          break;
        // spaces between pieces
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
          index += +switchValue - 1; // make empty space for next switchvalue squares
          break;
        case "/":
        case " ":
          index -= 1;
          break;
        default:
          console.log("Invalid FEN string");
          break;
      }
      index += 1;
      fenIndex += 1;
    }

    fenIndex += 1; //move fen index one index forward to the  side indicator
    this.sidePlay =
      fenString[fenIndex] === "w"
        ? (this.sideToPlay = COLOR.WHITE)
        : (this.sideToPlay = COLOR.BLACK);

    fenIndex += 2; //move fen index two index forward to the  castle bit indicator

    for (let i = 0; i < 4; i++) {
      if (fenString[fenIndex] == " ") {
        break;
      }
      switch (fenString[fenIndex]) {
        case "K":
          CASTLE_PERM.WKCA = true;
        case "Q":
          CASTLE_PERM.WQCA = true;
        case "k":
          CASTLE_PERM.BKCA = true;
        case "q":
          CASTLE_PERM.BQCA = true;
      }
      fenIndex += 1;
    }
    fenIndex += 1;
    if (fenString[fenIndex] != "-") {
      let file = fenString[fenIndex];
      let rank = fenString[fenIndex + 1];
      let key = file + rank;
      this.enPassant = SQUARES[key];
    }
  }

  resetPieceList() {
    for (const key in PIECE_LIST) {
      PIECE_LIST[key] = [];
    }
  }

  genPieceList() {
    this.boardIndex.forEach((index) => {
      switch (this.squares[index]) {
        case 1:
          PIECE_LIST.wP.push(index);
          break;
        case 2:
          PIECE_LIST.wN.push(index);
          break;
        case 3:
          PIECE_LIST.wB.push(index);
          break;
        case 4:
          PIECE_LIST.wR.push(index);
          break;
        case 5:
          PIECE_LIST.wQ.push(index);
          break;
        case 6:
          PIECE_LIST.wK.push(index);
          break;
        case 7:
          PIECE_LIST.bP.push(index);
          break;
        case 8:
          PIECE_LIST.bN.push(index);
          break;
        case 9:
          PIECE_LIST.bB.push(index);
          break;
        case 10:
          PIECE_LIST.bR.push(index);
          break;
        case 11:
          PIECE_LIST.bQ.push(index);
          break;
        case 12:
          PIECE_LIST.bK.push(index);
          break;
        default:
          break;
      }
    });
  }

  getPiecesOnBoard() {
    const squares = document.getElementsByClassName("square");
    for (let i = 0; i < squares.length; i++) {
      squares[i].style.backgroundImage = "";
    }
    Object.entries(PIECE_LIST).forEach((key) => {
      key[1].forEach((coord) => {
        let imageUrl = `url('./images/${key[0]}.png')`;
        let square = document.getElementById(coord);
        square.style.backgroundImage = imageUrl;
        square.style.backgroundRepeat = "no-repeat";
        square.style.backgroundSize = "100% 100%";
      });
    });
  }

  resetSqColor() {
    const lightSquares = document.getElementsByClassName("square light");
    for (let i = 0; i < lightSquares.length; i++) {
      lightSquares[i].style.backgroundColor = "#EFEFD2";
    }
    const darkSquares = document.getElementsByClassName("square dark");
    for (let i = 0; i < lightSquares.length; i++) {
      darkSquares[i].style.backgroundColor = "#779756";
    }
  }

  selectPieceToMove(board, event) {
    board.resetSqColor();
    board.fromSquare = event.target.id;
    board.toSquares = MOVELIST[board.fromSquare];
    const fromMOveSq = document.getElementById(board.fromSquare);
    fromMOveSq.style.backgroundColor = "#0d7c15";
    board.toSquares.forEach((toSquare) => {
      const toMoveSq = document.getElementById(toSquare);
      toMoveSq.style.backgroundColor = "#1ff95e";
    });
  }

  movePiece(board, piece, moveTo) {
    if (Object.values(board.toSquares).includes(parseInt(moveTo))) {
      board.squares[moveTo] = piece;
      board.squares[board.fromSquare] = PIECES.EMPTY;
      board.check = false
      if (piece === PIECES.wP || piece === PIECES.bP) {
        promotePawn(board, piece, moveTo);
      }
      castle(board, piece, moveTo);
      checkCastlePerm(piece, board.fromSquare);
      opponentKingCheck(board);
      board.resetPieceList();
      board.genPieceList();
      board.getPiecesOnBoard();
      board.resetSqColor();

      //gen next move next
      board.sideToPlay = 1 - board.sideToPlay;
      genLegalMove(board);

      //check if piecemove leads to check
      const selfMoveList = { ...MOVELIST };

      for (const key in selfMoveList) {
        selfMoveList[key].forEach((toSquare) => {
          let selfPiece = board.squares[key];
          let toSquarePiece = board.squares[toSquare];
          board.squares[toSquare] = selfPiece;
          board.squares[key] = PIECES.EMPTY;

          board.sideToPlay = 1 - board.sideToPlay;
          genLegalMove(board);
          selfKingCheck(board, toSquare, key, selfMoveList);
          board.squares[toSquare] = toSquarePiece;
          board.squares[key] = selfPiece;
          board.sideToPlay = 1 - board.sideToPlay;
        });
      }

      board.printBoard();
      board.resetPieceList();
      board.genPieceList();
      MOVELIST = selfMoveList;

      var empty = true;
      empty = Object.keys(MOVELIST).map((key) => {
        if (MOVELIST[key].length !== 0) {
          return false;
        } else {
          return true
        }
      });
      if (!empty.includes(false)) {
        if (board.check) {
          console.log("CheckMate")
        } else {
          console.log("stalemate")
        }
      }
    }
  }

  visaualizeLegalMove(board) {
    this.resetSqColor();
    this.element.addEventListener("click", function (event) {
      if (!this.clicked) {
        this.clicked = !this.clicked;
        board.selectPieceToMove(board, event);
      } else {
        this.clicked = !this.clicked;
        const piece = board.squares[board.fromSquare];
        const moveTo = event.target.id;
        board.movePiece(board, piece, moveTo);
        board.check = false
      }
    });
  }
}

class Square {
  constructor(rank, file, color, square) {
    this.element = document.createElement("square");
    this.element.classList.add("square");
    this.element.setAttribute("rank", rank);
    this.element.setAttribute("file", file);
    this.element.classList.add(color);
    this.element.setAttribute("id", square);
  }
}
