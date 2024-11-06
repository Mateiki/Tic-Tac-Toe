import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  
  return (
    <div className="home-page">
      <h1>Jogo da Velha</h1>
      <button className="navegacao" onClick={() => navigate('/register?mode=1')}>Um Jogador</button>
      <button className="navegacao" onClick={() => navigate('/register?mode=2')}>Dois Jogadores</button>
    </div>
  );
}

export default HomePage;
