import React, { useState } from 'react';
import Square from './Square';

function Board({ jogadorA, jogadorB }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  // Função para determinar o vencedor
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Linhas verticais
      [0, 4, 8], [2, 4, 6]             // Linhas diagonais
    ];
  
    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(squares);
  const status = winner
    ? `Vencedor: ${winner == 'X'?jogadorA:jogadorB}`
    : squares.every(square => square !== null)
      ? "Empate!"
      : `Próximo jogador: ${isXNext ? jogadorA+" (X)" : jogadorB+" (O)"}`;

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  return (
  <div>
  <div className="board-container">      
      <div className="board">
        {squares.map((value, index) => (
          <Square key={index} value={value} onClick={() => handleClick(index)} />
        ))}
      </div>	  
    </div>
  
  <h2>{status}</h2> 
  </div>
    
  );
}

export default Board;
