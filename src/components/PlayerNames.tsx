import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const PlayerNames: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translations } = useLanguage();
  const existingNames = location.state?.playerNames || [];
  const initialPlayerCount = location.state?.playerCount || existingNames.length || 2;
  
  const [playerNames, setPlayerNames] = useState<string[]>(
    existingNames.length ? existingNames : Array(initialPlayerCount).fill('')
  );
  const [showValidation, setShowValidation] = useState(false);

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...playerNames];
    newNames[index] = value;
    setPlayerNames(newNames);
  };

  const handleDeletePlayer = (index: number) => {
    if (playerNames.length > 2) {
      const newNames = playerNames.filter((_, i) => i !== index);
      setPlayerNames(newNames);
    }
  };

  const handleContinue = () => {
    setShowValidation(true);
    const validNames = playerNames.filter(name => name.trim() !== '');
    if (validNames.length === playerNames.length && validNames.length >= 2) {
      navigate('/confirmation', { state: { playerNames: validNames } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-pink-700 to-pink-500">
      <div className="flex-1 p-4 pb-24">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={() => navigate('/new-game')}
            className="bg-yellow-400 hover:bg-yellow-500 p-3 rounded-full mb-8 transition-transform hover:scale-105"
          >
            <ArrowLeft size={24} className="text-black" />
          </button>

          <h1 className="text-4xl font-bold text-white mb-8 text-center tracking-wider">
            {translations.playerNames}
          </h1>

          <div className="space-y-4">
            {playerNames.map((name, index) => (
              <div key={index} className="relative flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`${translations.player} ${index + 1}`}
                    maxLength={20}
                    className={`w-full px-6 py-3 bg-white rounded-full text-lg font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors
                      ${showValidation && !name.trim() ? 'border-2 border-red-500 bg-red-50' : ''}`}
                  />
                  {showValidation && !name.trim() && (
                    <span className="absolute -bottom-5 left-4 text-red-500 text-sm">
                      {translations.required}
                    </span>
                  )}
                </div>
                {playerNames.length > 2 && (
                  <button
                    onClick={() => handleDeletePlayer(index)}
                    className="bg-red-500 hover:bg-red-600 p-3 rounded-full transition-transform hover:scale-105 flex-shrink-0"
                  >
                    <X size={20} className="text-white" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-pink-700 to-transparent pt-8">
        <div className="w-full max-w-md mx-auto">
          <button
            onClick={handleContinue}
            className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
          >
            {translations.continue}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerNames;