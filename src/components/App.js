import React, { useState } from "react";

import Box from "./Box";
import "../style.css";

const App = () => {
  const [boardBoxes, setBoardBoxes] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState("x");
  let [turnNum, setturnNum] = useState(0);
  const onClick = index => {
    const allBoxes = [...boardBoxes];
    if (allBoxes[index] || checkWinner(allBoxes).winner) return;
    allBoxes[index] = isNext === "x" ? "X" : "O";
    setBoardBoxes(allBoxes);
    setIsNext(isNext === "x" ? "o" : "x");
    setturnNum(++turnNum);
  };
  const retry = () => {
    setBoardBoxes(Array(9).fill(null));
    setIsNext("x");
    setturnNum(0);
  };
  const renderBoxes = () => {
    let highlightArray = checkWinner(boardBoxes).highlightArray;
    return boardBoxes.map((box, index) => {
      return (
        <Box
          key={index}
          highlight={highlightArray[index]}
          value={box}
          onClick={onClick.bind(this, index)}
        />
      );
    });
  };
  return (
    <div className="container">
      <h1 className="title">
        Tic <span className="red">Tac</span> <span className="yellow">Toe</span>
      </h1>
      <div className="board">{renderBoxes()}</div>
      {<span></span>}
      <div className="message">
        {checkWinner(boardBoxes).winner ? (
          <span>
            Player{" "}
            <span
              className={
                checkWinner(boardBoxes).winner === "x" ? "playerX" : "playerO"
              }
            >
              {checkWinner(boardBoxes).winner}
            </span>{" "}
            won
          </span>
        ) : turnNum === 9 ? (
          "It is a draw"
        ) : (
          <span>
            Player{" "}
            <span className={isNext === "x" ? "playerX" : "playerO"}>
              {isNext === "x" ? "X" : "O"}
            </span>{" "}
            turn
          </span>
        )}
      </div>
      <button onClick={retry}>Try Again</button>
    </div>
  );
};

export default App;

function checkWinner(allBoxes) {
  let highlightArray = Array(9).fill(false);
  const winningSequence = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < winningSequence.length; i++) {
    let [I, II, III] = winningSequence[i];
    if (
      allBoxes[I] &&
      allBoxes[I] === allBoxes[II] &&
      allBoxes[II] === allBoxes[III] &&
      allBoxes[III] === allBoxes[I]
    ) {
      highlightArray[I] = true;
      highlightArray[II] = true;
      highlightArray[III] = true;
      return { winner: allBoxes[I], highlightArray: highlightArray };
    }
  }
  return { winner: null, highlightArray: highlightArray };
}
