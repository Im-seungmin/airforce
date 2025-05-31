import React, { useState, useEffect } from "react";
import "./styles.css";

const blackEntities = ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜", "♟"];
const whiteEntities = ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖", "♙"];

const pone = ["♟", "♙"];
const rook = ["♜", "♖"];
const knight = ["♞", "♘"];
const bishop = ["♝", "♗"];
const queen = ["♛", "♕"];
const king = ["♚", "♔"];

const initialBoard: Array<string[]> = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill(""),
  Array(8).fill(""),
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

const Board = () => {
  const [board, setBoard] = useState(initialBoard);
  const [backupBoard, setBackupBoard] = useState(initialBoard);
  const [selected, setSelected] = useState<[number, number] | null>(null);
  const [turn, setTurn] = useState<"white" | "black">("white");

  const SWTurn = () => {
    setTurn(turn === "white" ? "black" : "white");
  };

  const selectedValidaiton = (entity: string) => {
    return (
      (turn === "white" && whiteEntities.includes(entity)) ||
      (turn === "black" && blackEntities.includes(entity))
    );
  };

  const movedValidation = () => {
    return true;
  };

  const handleClick = (row: number, col: number) => {
    if (selected) {
      const [srcRow, srcCol] = selected;
      const piece = board[srcRow][srcCol];
      const newBoard = board.map((r) => [...r]);

      newBoard[srcRow][srcCol] = "";
      newBoard[row][col] = piece;
      setBackupBoard(board);
      setBoard(newBoard);
      setSelected(null);
      SWTurn();
    } else {
      if (board[row][col] !== "") {
        if (selectedValidaiton(board[row][col])) {
          setSelected([row, col]);
        }
      }
    }
  };

  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((cell, j) => {
            const isWhite = (i + j) % 2 === 0;
            const isSelected = selected?.[0] === i && selected?.[1] === j;
            return (
              <div
                key={`${i}-${j}`}
                className={`cell ${isWhite ? "whiteCell" : "blackCell"} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleClick(i, j)}
              >
                {cell}
              </div>
            );
          })}
        </div>
      ))}
      <button
        onClick={() => {
          setBoard(backupBoard);
        }}
      >
        Redo
      </button>
    </div>
  );
};

export default Board;
