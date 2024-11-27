import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useOdometer } from "../hooks/useOdometer";
import { questions } from "../data/questions";
import Question from "./Question";
import Odometer from "./Odometer";

const Game: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { translations, language } = useLanguage();
  const playerNames = location.state?.playerNames || [];
  const totalRounds = location.state?.rounds || 3;
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentNumber, setCurrentNumber] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const odometerRef = useRef<HTMLDivElement>(null);
  const { startAnimation } = useOdometer(odometerRef);

  const handleNext = () => {
    setShowQuestion(false);
    if (currentPlayerIndex < playerNames.length - 1) {
      setCurrentPlayerIndex((prev) => prev + 1);
      // Add delay before starting next animation
      setTimeout(() => {
        startAnimation().then(setCurrentNumber);
      }, 500);
    } else if (currentRound < totalRounds) {
      setCurrentRound((prev) => prev + 1);
      setCurrentPlayerIndex(0);
      // Add delay before starting next animation
      setTimeout(() => {
        startAnimation().then(setCurrentNumber);
      }, 500);
    } else {
      navigate("/game-finish", {
        state: {
          playerNames,
          rounds: totalRounds,
        },
      });
    }
  };

  useEffect(() => {
    // Initial delay before starting the odometer
    const startTimer = setTimeout(() => {
      startAnimation().then((number) => {
        setCurrentNumber(number);
      });
    }, 500);

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    if (currentNumber > 0) {
      // Add a longer delay before showing the question
      const questionTimer = setTimeout(() => {
        setShowQuestion(true);
      }, 1000); // Increased from 1000 to 2500 to allow for odometer animation
      return () => clearTimeout(questionTimer);
    }
  }, [currentNumber]);

  if (playerNames.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-pink-700 to-pink-500 p-4">
      <div className="w-full max-w-md">
        <div className="text-white text-lg mb-4 text-center">
          {translations.round} {currentRound}/{totalRounds}
        </div>

        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          {playerNames[currentPlayerIndex]}
        </h2>

        <Odometer odometerRef={odometerRef} />
        <div className="h-40">
          {currentNumber > 0 && (
            <Question
              question={questions[language][currentNumber - 1]}
              show={showQuestion}
            />
          )}
        </div>

        <button
          onClick={handleNext}
          className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-all transform hover:scale-105"
        >
          {currentPlayerIndex < playerNames.length - 1 ||
          currentRound < totalRounds
            ? translations.next
            : translations.finish}
        </button>
      </div>
    </div>
  );
};

export default Game;
