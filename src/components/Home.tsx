import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { translations } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-6xl font-bold text-white mb-20 tracking-wider text-center">
        {translations.title}
      </h1>
      
      <button
        onClick={() => navigate('/new-game')}
        className="w-64 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg mb-8 transition-all transform hover:scale-105"
      >
        {translations.newGame}
      </button>
      
      <LanguageSelector />
    </div>
  );
};

export default Home;