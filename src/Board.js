import React, { useState, useEffect } from 'react';
import Square from './Square';
import { useNavigate, useLocation } from 'react-router-dom';

function Board() {
  const location = useLocation();
  const { jogadorA, jogadorB, player1Symbol, player2Symbol } = location.state;

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayer1Next, setIsPlayer1Next] = useState(true);
  const [score, setScore] = useState({ X: 0, O: 0 });
  const navigate = useNavigate();

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.winningLine : [];

  useEffect(() => {
    if (winner) {
      const newScore = { ...score, [winner]: score[winner] + 1 };
      setScore(newScore);
    }
  }, [winner]);

  const status = winner
    ? `Vencedor: ${winner === player1Symbol ? jogadorA : jogadorB}`
    : squares.every(square => square !== null)
      ? "Empate!"
      : `Próximo jogador: ${isPlayer1Next ? jogadorA : jogadorB} (${isPlayer1Next ? player1Symbol : player2Symbol})`;

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isPlayer1Next ? player1Symbol : player2Symbol;
    setSquares(newSquares);
    setIsPlayer1Next(!isPlayer1Next);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsPlayer1Next(true);
  }

  function resetScore() {
    setScore({ X: 0, O: 0 });
    resetGame();
  }

  function HomePage() {
    navigate('/');
  }

  return (
    <div className="board-container">
      <h2>{jogadorA} ({player1Symbol}): {score[player1Symbol]} | {jogadorB} ({player2Symbol}): {score[player2Symbol]}</h2>
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinningSquare={winningLine.includes(index)}
            disabled={!!winner || squares.every(square => square !== null)}
          />
        ))}
      </div>
      <h2>{status}</h2>
      <div className="menu">
        <button onClick={resetGame}>Novo Jogo</button>
        <button onClick={resetScore}>Reiniciar Placar</button> 
      </div>
      <div className="inicio">
        <button onClick={HomePage}>Início</button>
      </div>  
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: line };
    }
  }
  return null;
}

export default Board;
