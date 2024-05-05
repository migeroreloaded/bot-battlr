// BotCollection.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortBar from './SortBar';

function BotCollection({ enlistBot }) {
  const [bots, setBots] = useState([]);
  const [filteredBots, setFilteredBots] = useState([]);
  const [enlistedClasses, setEnlistedClasses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/bots')
      .then(response => response.json())
      .then(data => {
        setBots(data);
        setFilteredBots(data); // Initialize filteredBots with all bots
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEnlist = (bot) => {
    enlistBot(bot);
    setEnlistedClasses([...enlistedClasses, bot.bot_class]); // Add enlisted class
    const updatedBots = filteredBots.filter(b => b.bot_class !== bot.bot_class); // Filter out enlisted bots from same class
    setFilteredBots(updatedBots);
  };

  const sortByAttribute = (attribute) => {
    const sortedBots = [...filteredBots].sort((a, b) => {
      return a[attribute] - b[attribute];
    });
    setFilteredBots(sortedBots);
  };

  const filterByClass = (selectedClasses) => {
    if (selectedClasses.length === 0) {
      setFilteredBots(bots); // If no classes selected, show all bots
    } else {
      const filtered = bots.filter(bot => selectedClasses.includes(bot.bot_class) && !enlistedClasses.includes(bot.bot_class));
      setFilteredBots(filtered);
    }
  };

  return (
    <div>
      <h1>Bot Collection</h1>
      <SortBar sortBy={sortByAttribute} filterByClass={filterByClass} />
      <div className="bot-list">
        {filteredBots.map(bot => (
          <div key={bot.id}>
            <Link to={`/bots/${bot.id}`}>
              <div className="bot-profile">
                <img src={bot.avatar_url} alt={bot.name} />
                <h2>{bot.name}</h2>
                <p>Health: {bot.health}</p>
                <p>Damage: {bot.damage}</p>
                <p>Armor: {bot.armor}</p>
                <p>Class: {bot.bot_class}</p>
                <p>Catchphrase: {bot.catchphrase}</p>
              </div>
            </Link>
            <button onClick={() => handleEnlist(bot)}>Enlist</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
