export default class Board {
  constructor() {
    this.element = document.querySelector('#chess--board')
    this.squares = Array(TOTAL_SQ_NUM)
    this.boardIndex = gen64arrayIndex()
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
    // this.squares.forEach(square =>{
    //   console.log(square)
    // })
  }

  printBoard() {
    let line = ''
    this.boardIndex.forEach((index, i) => {
      line += '   ' + this.squares[index] + '   '
      if ((i + 1) % 8 === 0) {
        // break line after 8 column
        line += '\n'
        line += '\n'
      }
    })
    console.log(line)
  }

  parseFEN(fenString) {
    let index = 0
    let fenIndex = 0
    while (index < 64 && fenIndex <= fenString.length) {
      console.log(index, fenIndex)
      switch ([...fenString][fenIndex]) {
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
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
          index += +[...fenString][fenIndex] - 1
          console.log([...fenString][fenIndex])
          break
        case '/':
          index -= 1
          break

        // default:
        //   console.log('fen ERRor')
      }
      index += 1
      fenIndex += 1
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
