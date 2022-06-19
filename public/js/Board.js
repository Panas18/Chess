export default class Board {
  constructor() {
    this.element = document.querySelector("#chess--board");
    this.initBoard();
  }

  initBoard() {
    for (let i = 0; i <= PLAY_SQUARE; i++) {
      let rank = 8 - Math.floor(i / 8);
      let fileNum = (i % 8) + 1;
      let color =
        (rank % 2 === 0 && fileNum % 2 === 0) ||
        (rank % 2 != 0 && fileNum % 2 != 0)
          ? "dark"
          : "light";
      let square = new Square(rank, fileNum, color);
      this.element.appendChild(square.element);
    }
  }
}

class Square {
  constructor(rank, file, color) {
    this.element = document.createElement("square");
    this.element.classList.add("square");
    this.element.setAttribute("rank", rank);
    this.element.setAttribute("file", file);
    this.element.classList.add(color);
  }
}
