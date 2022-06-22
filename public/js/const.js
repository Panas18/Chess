const TOTAL_SQ_NUM = 120
const BOARD_SQ_NUM = 64

const FILE_ARRAY = Array(TOTAL_SQ_NUM)
const RANK_ARRAY = Array(TOTAL_SQ_NUM)

const STARTING_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq -'
const CASTLE_PERM = {
  WKCA: false, WQCA: false, BKCA: false, BQCA: false,
}
const CASTLE_CHAR = ['K', 'Q', 'k', 'q']

const COLOR = {
  WHITE: 0, BLACK: 1, NONE: 2,
}
//value of each chess pieces on the board
const PIECES = {
  EMPTY: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5, wK: 6, bP: 7, bN: 8, bB: 9, bR: 10, bQ: 11, bK: 12,
}

const PIECE_LIST = {
  wP: [], wN: [], wB: [], wR: [], wQ: [], wK: [], bP: [], bN: [], bB: [], bR: [], bQ: [], bK: []

}
const PIECE_CHAR = '.PNBRQKpnbrqk'
const RANK_CHAR = '12345678'
const FILE_CHAR = 'abcdefgh'
const side = 'wbN'
const PIECES_VALUE = [
  0, 100, 300, 300, 500, 900, 1000, 100, 300, 300, 500, 900, 1000,
]

//File value of the chess board
const FILE = {
  FILE_A: 0, FILE_B: 1, FILE_C: 2, FILE_D: 3, FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7,
  FILE_OUT: 8,
}

//rank value of the chess board
const RANK = {
  RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, RANK_5: 4, RANK_6: 5, RANK_7: 6, RANK_8: 7,
  RANK_OUT: 8,
}

// index of  all 64 squares of the board
const SQUARES = {
  a1: 21, a2: 31, a3: 41, a4: 51, a5: 61, a6: 71, a7: 81, a8: 91,
  b1: 22, b2: 32, b3: 42, b4: 52, b5: 62, b6: 72, b7: 82, b8: 92,
  c1: 23, c2: 33, c3: 43, c4: 53, c5: 63, c6: 73, c7: 83, c8: 93,
  d1: 24, d2: 34, d3: 44, d4: 54, d5: 64, d6: 74, d7: 84, d8: 94,
  e1: 25, e2: 35, e3: 45, e4: 55, e5: 65, e6: 75, e7: 85, e8: 95,
  f1: 26, f2: 36, f3: 46, f4: 56, f5: 66, f6: 76, f7: 86, f8: 96,
  g1: 27, g2: 37, g3: 47, g4: 57, g5: 67, g6: 77, g7: 87, g8: 97,
  h1: 28, h2: 38, h3: 48, h4: 58, h5: 68, h6: 78, h7: 88, h8: 98,
  OFFBOARD: 100,
}
