import { Key, colors } from 'chessground/types';
import { ChessInstance, SQUARES } from 'chess.js';

export function toDests(chess: ChessInstance): Map<Key, Key[]> {
  const dests = new Map();
  SQUARES.forEach(s => {
    const moves = chess.moves({square: s, verbose: true});
    if (moves.length) dests.set(s, moves.map(m => m.to));
  });
  return dests;
}

export function getColor(board: ChessInstance) {
    return board.turn() === "w" ? colors[0] : colors[1]
}
