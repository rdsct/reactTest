import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es' | 'fr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  translations: Record<string, string>;
}

const translations = {
  en: {
    title: 'NEVER HAVE I EVER',
    newGame: 'New game',
    language: 'Language',
    players: 'Players',
    rounds: 'Rounds',
    addNames: 'Add names',
    playerNames: 'PLAYER NAMES',
    continue: 'Continue',
    required: 'Required',
    readyToPlay: 'Ready to play with',
    player: 'Player',
    players_plural: 'Players',
    rounds_count: 'Rounds',
    round: 'Round',
    start: 'Start',
    next: 'Next',
    finish: 'Finish',
    gameComplete: 'Game Complete!',
    playedWith: 'Played with',
    rounds_completed: 'rounds completed',
    playWithSamePlayers: 'Play with Same Players',
    home: 'Home'
  },
  es: {
    title: 'YO NUNCA',
    newGame: 'Nueva partida',
    language: 'Idioma',
    players: 'Jugadores',
    rounds: 'Rondas',
    addNames: 'Añadir nombres',
    playerNames: 'NOMBRES',
    continue: 'Continuar',
    required: 'Requerido',
    readyToPlay: 'Listo para jugar con',
    player: 'Jugador',
    players_plural: 'Jugadores',
    rounds_count: 'Rondas',
    round: 'Ronda',
    start: 'Empezar',
    next: 'Siguiente',
    finish: 'Terminar',
    gameComplete: '¡Juego Completado!',
    playedWith: 'Jugado con',
    rounds_completed: 'rondas completadas',
    playWithSamePlayers: 'Jugar con los Mismos Jugadores',
    home: 'Inicio'
  },
  fr: {
    title: 'JE N\'AI JAMAIS',
    newGame: 'Nouvelle partie',
    language: 'Langue',
    players: 'Joueurs',
    rounds: 'Tours',
    addNames: 'Ajouter noms',
    playerNames: 'NOMS DES JOUEURS',
    continue: 'Continuer',
    required: 'Requis',
    readyToPlay: 'Prêt à jouer avec',
    player: 'Joueur',
    players_plural: 'Joueurs',
    rounds_count: 'Tours',
    round: 'Tour',
    start: 'Commencer',
    next: 'Suivant',
    finish: 'Terminer',
    gameComplete: 'Partie Terminée !',
    playedWith: 'Joué avec',
    rounds_completed: 'tours complétés',
    playWithSamePlayers: 'Jouer avec les Mêmes Joueurs',
    home: 'Accueil'
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage,
      translations: translations[language],
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};