import React, { useState } from "react";
import "./App.css";

import { Chess } from "chess.js";
import { Key, Piece } from "chessground/types";
import { Config } from "chessground/config";
import ChessGround from "./chess/chessground";
import { getColor, toDests } from "./chess/util";

import fens from "./chess/fens";

// Initial Board
var fen = fens[Math.floor(Math.random() * fens.length)];
const board = new Chess(fen);
var moves = board.moves({ verbose: true });
var move = moves[Math.floor(Math.random() * moves.length)];

function App(): JSX.Element {
  const [config, setConfig] = useState<Partial<Config>>({
    fen: board.fen(),
    orientation: getColor(board),
    movable: { free: false, dests: toDests(board) },
    draggable: { showGhost: true },
    events: { move: playerMove() },
  });

  function playerMove(): (orig: Key, dest: Key, capturedPiece?: Piece) => void {
    return (orig: Key, dest: Key): void => {
      if (move.from === orig && move.to === dest) {
        // Get new fen not equal to current one
        let newFen = fens[Math.floor(Math.random() * fens.length)];
        while (fen === newFen) {
          newFen = fens[Math.floor(Math.random() * fens.length)];
        }

        // Update fen and move if correct move is played.
        fen = newFen;
        board.load(fen);
        moves = board.moves({ verbose: true });
        move = moves[Math.floor(Math.random() * moves.length)];
      }

      // Reset config for Chessground board.
      setConfig({
        fen: board.fen(),
        orientation: getColor(board),
        movable: { free: false, dests: toDests(board) },
        draggable: { showGhost: true },
        events: { move: playerMove() },
        highlight: { lastMove: false },
      });
    };
  }

  return (
    <div className="App">
      <div style={{ display: "grid", gridTemplateColumns: "30% 40% 30%", height: "auto", paddingTop: "4rem" }}>
        <h1 style={{ margin: "auto" }}>{move.san}</h1>
        <ChessGround config={config} />
        <h1 style={{ margin: "auto" }}>{move.san}</h1>
      </div>
    </div>
  );
}

export default App;
