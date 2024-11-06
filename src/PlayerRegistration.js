import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import XImage from './assets/X.png'; 
import OImage from './assets/O.png'; 

function PlayerRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [player1Symbol, setPlayer1Symbol] = useState(null);
  const [player2Symbol, setPlayer2Symbol] = useState(null);

  const handleSubmit = () => {
    if (!player1) {
      const message = mode === '1'
        ? "Por favor, escolha um nome para o Jogador antes de começar o jogo."
        : "Por favor, escolha um nome para o Jogador 1 antes de começar o jogo.";
      alert(message);
      return;
    }
  
    if (!player1Symbol) {
      alert("Por favor, escolha um símbolo para o Jogador 1 antes de começar o jogo.");
      return;
    }
  
    if (mode === '2' && !player2) {
      alert("Por favor, escolha um nome para o Jogador 2 antes de começar o jogo.");
      return;
    }

    if (mode === '2' && !player2Symbol) {
      alert("Por favor, escolha um símbolo para o Jogador 2 antes de começar o jogo.");
      return;
    }

    if (mode === '1') {
      navigate('/game', { state: { jogadorA: player1, jogadorB: 'Computador', player1Symbol, player2Symbol: player1Symbol === 'X' ? 'O' : 'X' } });
    } else {
      navigate('/game', { state: { jogadorA: player1, jogadorB: player2, player1Symbol, player2Symbol } });
    }
  };

  const chooseSymbol = (player, symbol) => {
    if (player === 1) {
      setPlayer1Symbol(symbol);
      setPlayer2Symbol(symbol === 'X' ? 'O' : 'X'); // Define automaticamente o símbolo do segundo jogador
    } else if (player === 2) {
      setPlayer2Symbol(symbol);
      setPlayer1Symbol(symbol === 'X' ? 'O' : 'X'); // Define automaticamente o símbolo do primeiro jogador
    }
  };

  const renderSymbolStatus = (symbol) => {
    if (symbol === "X") {
      return <p>X escolhido</p>;
    } else if (symbol === "O") {
      return <p>O escolhido</p>;
    } else {
      return <p>Nenhum ícone escolhido</p>;
    }
  };

  return (
    <div className="registration-page">
      <h2>Cadastro de Jogadores</h2>
      <input
        type="text"
        placeholder="Nome do Jogador X"
        value={player1}
        onChange={(e) => setPlayer1(e.target.value)}
      />
      {mode === '2' && (
        <input
          type="text"
          placeholder="Nome do Jogador O"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />
      )}

      <div className='icon-choice'>
        <h2>Escolha com o que vai jogar {player1}</h2>
        <div className='icon-buttons'>
          <button 
            className='img-button' 
            onClick={() => chooseSymbol(1, "X")}
          >
            <img src={XImage} alt="Símbolo X" />  
          </button>  
          <button 
            className='img-button' 
            onClick={() => chooseSymbol(1, "O")}
          >
            <img src={OImage} alt="Símbolo O" />  
          </button>  
        </div>    
        {renderSymbolStatus(player1Symbol)}
      </div>

      {mode === '2' && (
        <div className='icon-choice'>
          <h2>Escolha com o que vai jogar {player2}</h2>
          <div className='icon-buttons'>
            <button 
              className='img-button' 
              onClick={() => chooseSymbol(2, "X")}
            >
              <img src={XImage} alt="Símbolo X" />  
            </button>  
            <button 
              className='img-button' 
              onClick={() => chooseSymbol(2, "O")}
            >
              <img src={OImage} alt="Símbolo O" />  
            </button>  
          </div>    
          {renderSymbolStatus(player2Symbol)}
        </div>
      )}

      <button onClick={handleSubmit}>Iniciar Jogo</button>
    </div>
  );
}

export default PlayerRegistration;
