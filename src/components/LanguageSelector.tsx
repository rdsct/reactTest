import React, { useState } from 'react';
import { Flag, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, translations } = useLanguage();

  const flags = {
    en: '🇬🇧',
    es: '🇪🇸',
    fr: '🇫🇷',
  };

  const languageNames = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 w-64 py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        <Flag className="ml-4" size={24} />
        <span>{translations.language}</span>
        <ChevronDown className="ml-auto mr-4" size={20} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl overflow-hidden z-10">
          {Object.entries(languageNames).map(([code, name]) => (
            <button
              key={code}
              onClick={() => {
                setLanguage(code as 'en' | 'es' | 'fr');
                setIsOpen(false);
              }}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-gray-100 transition-colors
                ${language === code ? 'bg-gray-100' : ''}`}
            >
              <span className="text-xl">{flags[code as keyof typeof flags]}</span>
              <span className="font-medium">{name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;