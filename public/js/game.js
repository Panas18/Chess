import Board from './Board.js'
const board = new Board()

// genLegalMove(board)
board.visaualizeLegalMove(board)
minimax(board, 2, COLOR.WHITE)
