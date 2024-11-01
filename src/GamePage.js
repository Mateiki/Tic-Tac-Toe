import React from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';

function GamePage() {
  const location = useLocation();
  const { player1, player2 } = location.state || { player1: '', player2: '' };

  return (
    <div className="game-page">
      <Board jogadorA={player1} jogadorB={player2}/>
    </div>
  );
}

export default GamePage;
