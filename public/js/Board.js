export default class Board {
  constructor() {
    this.element = document.querySelector('#chess--board')
    this.drawBoard()
    this.initBoard()
  }

  drawBoard() {
    for (let i = 0; i < PLAY_SQ_NUM; i++) {
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

  initBoard() {
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
