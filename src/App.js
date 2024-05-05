import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import './App.css';
import BotCollection from './Components/BotCollection';
import YourBotArmy from './Components/YourBotArmy';
import BotSpecs from './Components/BotSpecs';

function App() {
  const [enlistedBots, setEnlistedBots] = useState([]);

  const enlistBot = (bot) => {
    if (!enlistedBots.some(b => b.id === bot.id)) {
      setEnlistedBots([...enlistedBots, bot]);
    }
  };

  const releaseBot = (bot) => {
    const updatedArmy = enlistedBots.filter(b => b.id !== bot.id);
    setEnlistedBots(updatedArmy);
  };

  const dischargeBot = (bot) => {
    // Remove bot from frontend
    const updatedArmy = enlistedBots.filter(b => b.id !== bot.id);
    setEnlistedBots(updatedArmy);

    // Remove bot from backend (You'll need to implement the backend deletion logic here)
    // Example:
    fetch(`http://localhost:4000/bots/${bot.id}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        console.log('Bot deleted from backend successfully');
      } else {
        console.error('Failed to delete bot from backend');
      }
    })
    .catch(error => console.error('Error deleting bot from backend:', error));
  };

  return (
    <Router>
      <div className="App">
        <h1>Bot Battleground</h1>
        <Routes>
          <Route path="/" element={<BotCollection enlistBot={enlistBot} />} />
          <Route path="/your-bot-army" element={<YourBotArmy army={enlistedBots} releaseBot={releaseBot} dischargeBot={dischargeBot} />} />
          <Route path="/bots/:botId" element={<BotSpecs enlistBot={enlistBot} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
