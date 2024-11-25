import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translations } = useLanguage();
  const playerNames = location.state?.playerNames || [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-700 to-pink-500">
      <div className="flex-1 p-4">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => navigate('/add-names', { state: { playerNames } })}
            className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-full mb-8 transition-transform hover:scale-105"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>

          <h1 className="text-6xl font-bold text-white mb-8 text-center tracking-wider">
            {translations.title}
          </h1>

          <div className="flex flex-col items-center justify-center gap-8">
            <div className="text-center">
              <p className="text-white text-xl mb-2">{translations.readyToPlay}</p>
              <p className="text-white text-4xl font-bold">
                {playerNames.length}{' '}
                {playerNames.length === 1 ? translations.player : translations.players_plural}
              </p>
            </div>

            <button
              onClick={() => navigate('/game', { state: { playerNames } })}
              className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
            >
              {translations.start}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;