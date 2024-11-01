import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <h1>Bem-vindo ao Jogo da Velha</h1>
      <button onClick={() => navigate('/register?mode=1')}>Um Jogador</button>
	  <p/>
      <button onClick={() => navigate('/register?mode=2')}>Dois Jogadores</button>
    </div>
  );
}

export default HomePage;
