import { motion, useDragControls } from "framer-motion";
import React, { useState } from "react";

const LandingPage: React.FC<propTypes> = ({
  player1,
  setPlayer1,
  player2,
  setPlayer2,
  startGame,
  setStartGame
}) => {
  const assignUsers = (e: React.MouseEvent): void => {
    e.preventDefault();
    setStartGame(true);
  };

  return (
    <div className="landingpage">
      <div className="inputs">
        <label htmlFor="player1">Player 1:</label>
        <br />
        <input
          name="player1"
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setPlayer1(e.target.value);
          }}
        />
        <br />
        <label htmlFor="player2">Player 2:</label>
        <br />
        <input
          name="player2"
          type="text"
          onChange={(e) => {
            e.preventDefault();
            setPlayer2(e.target.value);
          }}
        />
      </div>

      <motion.button onClick={assignUsers} className="startButton">
        Start Game
      </motion.button>
    </div>
  );
};

export interface propTypes {
  player1: string;
  setPlayer1: React.Dispatch<React.SetStateAction<string>>;
  player2: string;
  setPlayer2: React.Dispatch<React.SetStateAction<string>>;
  startGame: boolean;
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default LandingPage;
