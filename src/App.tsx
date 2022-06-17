import "./styles.css";
import Circle from "./Circle";
import Cross from "./Cross";
import React, { useState, useEffect } from "react";
import LandingPage from "./LandingPage";
import { motion } from "framer-motion";
import Fireworks from "./FIreworks";

export default function App() {
  type checkboard = number[][];

  enum Playerrole {
    player1 = "player1",
    player2 = "player2"
  }
  type switchTurn = "player1" | "player2";
  const [player1moves, setPlayer1moves] = useState(0);
  const [player2moves, setPlayer2moves] = useState(0);
  const [winner, setWinner] = useState("");
  const [moves, setMoves] = useState<number>(0);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [switchTurn, setSwitchTurn] = useState<switchTurn>("player1");
  const [board, setBoard] = useState<checkboard>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]);
  const gameBoardChecker: number[][] = [
    [1, 1, 1],
    [2, 2, 2]
  ];

  function areEqual(arr1: number[], arr2: number[]): boolean {
    let n = arr1.length;
    let m = arr2.length;
    if (n !== m) return false;
    for (let i = 0; i < n; i++) if (arr1[i] !== arr2[i]) return false;
    return true;
  }

  const checkTilesRow = (): string | undefined => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 2; j++) {
        if (
          areEqual(board[i], gameBoardChecker[j]) === true &&
          areEqual(gameBoardChecker[j], [1, 1, 1])
        ) {
          return "player1";
        } else if (
          areEqual(board[i], gameBoardChecker[j]) === true &&
          areEqual(gameBoardChecker[j], [2, 2, 2])
        ) {
          return "player2";
        }
      }
    }
  };

  const checkTilesDiagonals = (): string | undefined => {
    const firstDiagonal: number[] = [];
    const secondDiagonal: number[] = [];

    firstDiagonal.push(board[0][0], board[1][1], board[2][2]);
    secondDiagonal.push(board[0][2], board[1][1], board[2][0]);
    console.log(firstDiagonal, secondDiagonal);
    if (
      areEqual(firstDiagonal, gameBoardChecker[0]) === true ||
      areEqual(secondDiagonal, gameBoardChecker[0]) === true
    ) {
      return "player1";
    } else if (
      areEqual(firstDiagonal, gameBoardChecker[1]) === true ||
      areEqual(secondDiagonal, gameBoardChecker[1]) === true
    ) {
      return "player2";
    }
  };

  const checkTilesColumns = (): string | undefined => {
    let firstColumnArr: number[] = [];
    let secondColumnArr: number[] = [];
    let thirdColumnArr: number[] = [];
    console.log(board);
    board.map((item) => {
      firstColumnArr.push(item[0]);
      secondColumnArr.push(item[1]);
      thirdColumnArr.push(item[2]);
    });
    if (
      areEqual(firstColumnArr, gameBoardChecker[0]) === true ||
      areEqual(secondColumnArr, gameBoardChecker[0]) === true ||
      areEqual(thirdColumnArr, gameBoardChecker[0]) === true
    ) {
      return "player1";
    } else if (
      areEqual(firstColumnArr, gameBoardChecker[1]) === true ||
      areEqual(secondColumnArr, gameBoardChecker[1]) === true ||
      areEqual(thirdColumnArr, gameBoardChecker[1]) === true
    ) {
      return "player2";
    }
  };

  const placeTile = (
    e: React.MouseEvent,
    role: string,
    index1: number,
    index2: number
  ) => {
    if (role === player1) {
      board[index1][index2] = 1;
      setPlayer1moves((prev) => prev + 1);
      setSwitchTurn(Playerrole.player2);
    } else if (role === player2) {
      board[index1][index2] = 2;
      setPlayer2moves((prev) => prev + 1);

      setSwitchTurn(Playerrole.player1);
    }

    // setMoves((prev) => prev + 1);
  };

  useEffect(() => {
    if (switchTurn === Playerrole.player1) {
      setRole(player1);
    } else if (switchTurn === Playerrole.player2) {
      setRole(player2);
    }
  }, [switchTurn, startGame, board]);

  return (
    <div className="App">
      <motion.div animate={{ y: [-200, 0] }} className="header">
        <div></div>
        <h1 className="title">Welcome to our Tic-Tac-Toe game</h1>
        <div className="playerscores">
          <p>
            {player1}: {player1moves}
          </p>
          <p>
            {player2}: {player2moves}
          </p>
        </div>
      </motion.div>
      {startGame === false ? (
        <motion.div
          animate={{ y: [800, 0] }}
          transition={{ initial: "hidden", delay: 1.5 }}
        >
          <LandingPage
            player1={player1}
            setPlayer1={setPlayer1}
            player2={player2}
            setPlayer2={setPlayer2}
            startGame={startGame}
            setStartGame={setStartGame}
          />
        </motion.div>
      ) : startGame === true && endGame === true ? (
        <>
          <motion.div
            animate={{ scale: [0.5, 1], y: [-800, 0] }}
            transition={{ duration: 2 }}
          >
            <h1>Game ended</h1>
            <h1>{winner} won!</h1>
          </motion.div>
          <Fireworks></Fireworks>
        </>
      ) : (
        <motion.div
          animate={{ y: [800, 0], scale: [0.5, 1] }}
          transition={{ duration: 1 }}
          className="boardContainer"
        >
          <div className="board">
            {board.map((item, index1) =>
              item.map((i, index2) => {
                if (i === 0) {
                  return (
                    <div className="tile">
                      <button
                        onClick={(e) => {
                          placeTile(e, role, index1, index2);
                          setMoves((prev) => prev + 1);
                          if (
                            checkTilesColumns() === "player1" ||
                            checkTilesRow() === "player1" ||
                            checkTilesDiagonals() === "player1"
                          ) {
                            setWinner(player1);
                            setEndGame(true);
                          } else if (
                            checkTilesColumns() === "player2" ||
                            checkTilesRow() === "player2" ||
                            checkTilesDiagonals() === "player2"
                          ) {
                            setWinner(player2);
                            setEndGame(true);
                          }
                        }}
                      ></button>
                    </div>
                  );
                } else if (i === 1) {
                  return (
                    <div className="tile">
                      <Cross />
                    </div>
                  );
                } else if (i === 2) {
                  return (
                    <div className="tile">
                      <Circle />
                    </div>
                  );
                } else {
                  return null;
                }
              })
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
