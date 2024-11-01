import React from 'react';
import XImage from './assets/X.png'; 
import OImage from './assets/O.png'; 
import './Square.css'; 

function Square({ value, onClick, isWinningSquare, disabled }) {
  // Escolha a imagem com base no valor ('X' ou 'O')
  let image = null;
  if (value === 'X') {
    image = <img src={XImage} alt="X" className="square-image" />;
  } else if (value === 'O') {
    image = <img src={OImage} alt="O" className="square-image" />;
  }

  return (
    <button
      className={`square ${isWinningSquare ? 'winning-square' : ''}`}
      onClick={onClick}
	  disabled={disabled}
    >
      {image} {/* Renderiza a imagem, se houver */}
    </button>
  );
}

export default Square;
