import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./components/Home";
import NewGame from "./components/NewGame";
import PlayerNames from "./components/PlayerNames";
import Confirmation from "./components/Confirmation";
import Game from "./components/Game";
import GameFinish from "./components/GameFinish";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-b from-pink-700 to-pink-500">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-game" element={<NewGame />} />
            <Route path="/add-names" element={<PlayerNames />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/game" element={<Game />} />
            <Route path="/game-finish" element={<GameFinish />} />
          </Routes>
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
