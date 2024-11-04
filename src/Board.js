import React, { useState, useEffect } from 'react';
import Square from './Square';
import { useNavigate } from 'react-router-dom';

function Board({ jogadorA, jogadorB }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  
  const navigate = useNavigate();
  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.winningLine : [];
  
  const [score, setScore] = useState({ X: 0, O: 0 }); // Estado para o placar
  
   // Atualiza o placar quando há um vencedor
  useEffect(() => {
    if (winner) {
      const newScore = { ...score, [winner]: score[winner] + 1 };
      setScore(newScore);
    }
  }, [winner]);


  const status = winner
    ? `Vencedor: ${winner === 'X' ? jogadorA : jogadorB}`
    : squares.every(square => square !== null)
      ? "Empate!"
      : `Próximo jogador: ${isXNext ? jogadorA + " (X)" : jogadorB + " (O)"}`;

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
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
	  <h2>{jogadorA} (X): {score.X} {jogadorB} (O): {score.O}</h2>
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinningSquare={winningLine.includes(index)}
            disabled={!!winner || squares.every(square => square !== null)} // Desabilita se houver um vencedor ou se for empate
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
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
    [0, 4, 8], [2, 4, 6]             // Linhas diagonais
  ];

  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: line }; // Retorna o vencedor e a linha vencedora
    }
  }
  return null;
}

export default Board;
