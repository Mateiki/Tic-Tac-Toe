import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function PlayerRegistration() {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = new URLSearchParams(location.search).get('mode');
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');

  const handleSubmit = () => {
    if (mode === '1') {
      navigate('/game', { state: { player1, player2: 'Computador' } });
    } else {
      navigate('/game', { state: { player1, player2 } });
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
      <button onClick={handleSubmit}>Iniciar Jogo</button>
    </div>
  );
}

export default PlayerRegistration;
