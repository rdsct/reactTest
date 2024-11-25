import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const NewGame: React.FC = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();
  const [playerCount, setPlayerCount] = useState(9);

  const decrementPlayers = () => {
    if (playerCount > 2) {
      setPlayerCount(prev => prev - 1);
    }
  };

  const incrementPlayers = () => {
    if (playerCount < 15) {
      setPlayerCount(prev => prev + 1);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-full mb-8 transition-transform hover:scale-105"
        >
          <ArrowLeft size={24} className="text-black" />
        </button>

        <h1 className="text-6xl font-bold text-white mb-20 text-center tracking-wider">
          {translations.title}
        </h1>

        <div className="flex flex-col items-center gap-8">
          <div className="text-white text-xl mb-4">{translations.players}:</div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={decrementPlayers}
              className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded-full transition-transform hover:scale-105"
            >
              <Minus size={24} className="text-black" />
            </button>

            <div className="bg-white text-black text-2xl font-bold py-2 px-8 rounded-full min-w-[100px] text-center">
              {String(playerCount).padStart(2, '0')}
            </div>

            <button
              onClick={incrementPlayers}
              className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded-full transition-transform hover:scale-105"
            >
              <Plus size={24} className="text-black" />
            </button>
          </div>

          <button
            onClick={() => navigate('/add-names', { state: { playerCount } })}
            className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            {translations.addNames}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewGame;