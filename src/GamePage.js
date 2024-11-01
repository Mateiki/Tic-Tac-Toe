import React from 'react';
import { useLocation } from 'react-router-dom';
import Board from './Board';

function GamePage() {
  const location = useLocation();
  const { player1, player2 } = location.state || { player1: '', player2: '' };

  return (
    <div className="game-page">
      <h2>Jogo da Velha</h2>
      <p>Jogador 1: {player1}</p>
      <p>Jogador 2: {player2}</p>
      <Board jogadorA={player1} jogadorB={player2}/>
    </div>
  );
}

export default GamePage;
