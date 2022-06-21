export default class Board {
  constructor() {
    this.enPassant = 0
    this.sideToPlay = COLOR.NONE
    this.squares = Array(TOTAL_SQ_NUM)
    this.boardIndex = gen64arrayIndex()

    this.element = document.querySelector('#chess--board')
    this.initFileRank()
    this.initBoard()
    this.drawBoard()
    this.parseFEN(STARTING_POSITION)
    this.printBoard()
  }

  drawBoard() {
    for (let i = 0; i < BOARD_SQ_NUM; i++) {
      let rank = 8 - Math.floor(i / 8)
      let fileNum = (i % 8) + 1
      let color =
        (rank % 2 === 0 && fileNum % 2 === 0) ||
        (rank % 2 != 0 && fileNum % 2 != 0)
          ? 'dark'
          : 'light'
      let square = new Square(rank, fileNum, color)
      this.element.appendChild(square.element)
    }
  }

  initFileRank() {
    for (let i = 0; i < TOTAL_SQ_NUM; i++) {
      FILE_ARRAY[i] = SQUARES.OFFBOARD
      RANK_ARRAY[i] = SQUARES.OFFBOARD
    }
    for (let rank = RANK.RANK_1; rank <= RANK.RANK_8; rank++) {
      for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
        let sq = FR2SQ(file, rank)
        FILE_ARRAY[sq] = file
        RANK_ARRAY[sq] = rank
      }
    }
  }

  initBoard() {
    // make every squares value as offboard value
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i] = SQUARES.OFFBOARD
    }

    //make board squares empty at first
    this.boardIndex.forEach((index) => {
      this.squares[index] = PIECES.EMPTY
    })
  }

  printBoard() {
    for (let rank = RANK.RANK_8; rank >= RANK.RANK_1; rank--) {
      let line = RANK_CHAR[rank] + '  '
      for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
        let square = FR2SQ(file, rank)
        let piece = this.squares[square]
        line += ' ' + PIECE_CHAR[piece] + ' '
      }
      console.log(line)
    }
    let line = '   '
    for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
      line += ' ' + FILE_CHAR[file] + ' '
    }
    console.log('')
    console.log(line)

    console.log('To Play: ' + side[this.sidePlay])
    console.log('EnPassant Square: ' + this.enPassant)

    line = ''
    Object.keys(CASTLE_PERM).forEach((key, index) => {
      if (CASTLE_PERM[key]) line += CASTLE_CHAR[index]
    })
    console.log('Castle Permission: ' + line)
  }
  // console.log('Castle: ' + line)

  parseFEN(fenString) {
    let index = 63
    let fenIndex = 0
    while (index >= 0 && fenIndex <= fenString.length) {
      let switchValue = [...fenString][fenIndex]
      switch (switchValue) {
        //black pieces
        case 'r':
          this.squares[this.boardIndex[index]] = PIECES.bR
          break
        case 'n':
          this.squares[this.boardIndex[index]] = PIECES.bN
          break
        case 'b':
          this.squares[this.boardIndex[index]] = PIECES.bB
          break
        case 'q':
          this.squares[this.boardIndex[index]] = PIECES.bQ
          break
        case 'k':
          this.squares[this.boardIndex[index]] = PIECES.bK
          break
        case 'p':
          this.squares[this.boardIndex[index]] = PIECES.bP
          break
        // white pieces
        case 'R':
          this.squares[this.boardIndex[index]] = PIECES.wR
          break
        case 'N':
          this.squares[this.boardIndex[index]] = PIECES.wN
          break
        case 'B':
          this.squares[this.boardIndex[index]] = PIECES.wB
          break
        case 'Q':
          this.squares[this.boardIndex[index]] = PIECES.wQ
          break
        case 'K':
          this.squares[this.boardIndex[index]] = PIECES.wK
          break
        case 'P':
          this.squares[this.boardIndex[index]] = PIECES.wP
          break
        // spaces between pieces
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
          index -= +switchValue - 1 // make empty space for next switchvalue squares
          break
        case '/':
        case ' ':
          index += 1
          break
        default:
          console.log('Invalid FEN string')
          break
      }
      index -= 1
      fenIndex += 1
    }

    fenIndex += 1 //move fen index one index forward to the  side indicator
    this.sidePlay =
      fenString[fenIndex] === 'w'
        ? (this.sideToPlay = COLOR.WHITE)
        : (this.sideToPlay = COLOR.BLACK)

    fenIndex += 2 //move fen index two index forward to the  castle bit indicator

    for (let i = 0; i < 4; i++) {
      if (fenString[fenIndex] == ' ') {
        break
      }
      switch (fenString[fenIndex]) {
        case 'K':
          CASTLE_PERM.WKCA = true
        case 'Q':
          CASTLE_PERM.WQCA = true
        case 'k':
          CASTLE_PERM.BKCA = true
        case 'q':
          CASTLE_PERM.BQCA = true
      }
      fenIndex += 1
    }
    fenIndex += 1
    if (fenString[fenIndex] != '-') {
      let file = fenString[fenIndex]
      let rank = fenString[fenIndex + 1]
      let key = file + rank
      this.enPassant = SQUARES[key]
    }
  }
}

class Square {
  constructor(rank, file, color) {
    this.element = document.createElement('square')
    this.element.classList.add('square')
    this.element.setAttribute('rank', rank)
    this.element.setAttribute('file', file)
    this.element.classList.add(color)
  }
}
