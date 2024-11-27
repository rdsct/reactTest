import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { Trophy, Home, Users } from 'lucide-react';

const GameFinish: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translations } = useLanguage();
  const { playerNames, rounds } = location.state || {};

  const handlePlayWithSamePlayers = () => {
    navigate('/confirmation', { 
      state: { 
        playerNames, 
        rounds 
      } 
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-700 to-pink-500 p-4">
      <div className="w-full max-w-md text-center">
        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-8" />
        
        <h1 className="text-4xl font-bold text-white mb-8">
          {translations.gameComplete}
        </h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <p className="text-white text-xl mb-4">
            {translations.playedWith} {playerNames?.length || 0} {translations.players_plural}
          </p>
          <p className="text-white text-xl">
            {rounds} {translations.rounds_completed}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePlayWithSamePlayers}
            className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Users size={24} />
            <span>{translations.playWithSamePlayers}</span>
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white/20 hover:bg-white/30 text-white font-bold rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <Home size={24} />
            <span>{translations.home}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameFinish;