/* 
  return index value of  square from file and rank
*/
function FR2SQ(file, rank) {
  return 21 + file + rank * 10
}

/*
  return index of 64 playable square of the board from total of 120 squares
 */
function gen64arrayIndex() {
  board64Array = []
  for (let rank = RANK.RANK_8; rank >= RANK.RANK_1; rank--) {
    for (let file = FILE.FILE_A; file <= FILE.FILE_H; file++) {
      let sq = FR2SQ(file, rank)
      board64Array.push(sq)
    }
  }
  return board64Array
}
