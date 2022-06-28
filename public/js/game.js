import Board from './Board.js'
const board = new Board()

// genLegalMove(board)
board.visaualizeLegalMove(board)
minimax(board, 1, COLOR.WHITE)