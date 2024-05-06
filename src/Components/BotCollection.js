import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SortBar from './SortBar';

function BotCollection({ enlistBot }) {
  const [bots, setBots] = useState([]);
  const [filteredBots, setFilteredBots] = useState([]);
  const [selectedSortAttribute, setSelectedSortAttribute] = useState(null);
  const [enlistedBotsByClass, setEnlistedBotsByClass] = useState({});

  useEffect(() => {
    fetch('http://localhost:4000/bots')
      .then(response => response.json())
      .then(data => {
        setBots(data);
        setFilteredBots(data); // Initialize filteredBots with all bots
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Initialize enlistedBotsByClass with an empty array for each bot_class
    const initialEnlistedBotsByClass = {};
    bots.forEach(bot => {
      if (!initialEnlistedBotsByClass[bot.bot_class]) {
        initialEnlistedBotsByClass[bot.bot_class] = [];
      }
    });
    setEnlistedBotsByClass(initialEnlistedBotsByClass);
  }, [bots]);

  const handleEnlist = (bot) => {
    // Check if any bot from the same class is already enlisted
    if (!enlistedBotsByClass[bot.bot_class].some(b => b.id !== bot.id)) {
      // Enlist the bot
      enlistBot(bot);
      setFilteredBots(filteredBots.filter(b => b.id !== bot.id)); // Remove enlisted bot from filtered list
      // Add the enlisted bot to the enlistedBotsByClass state
      setEnlistedBotsByClass(prevState => ({
        ...prevState,
        [bot.bot_class]: [...prevState[bot.bot_class], bot]
      }));
    } else {
      // Bot of the same class already enlisted, prevent enlistment
      console.log(`A bot from class ${bot.bot_class} is already enlisted.`);
      alert(`A bot from class ${bot.bot_class} is already enlisted.`);
    }
  };

  const sortByAttribute = (attribute) => {
    if (!attribute) {
      setFilteredBots(bots); // Show all bots without sorting
    } else {
      const sortedBots = [...filteredBots].sort((a, b) => {
        return a[attribute] - b[attribute];
      });
      setSelectedSortAttribute(attribute); // Update selected sort attribute
      setFilteredBots(sortedBots);
    }
  };

  const filterByClass = (selectedClasses) => {
    if (selectedClasses.length === 0) {
      setFilteredBots(bots); // If no classes selected, show all bots
    } else {
      const filtered = bots.filter(bot => selectedClasses.includes(bot.bot_class));
      if (selectedSortAttribute) {
        // Preserve current sorting order while applying filter
        const sortedFiltered = filtered.sort((a, b) => {
          return a[selectedSortAttribute] - b[selectedSortAttribute];
        });
        setFilteredBots(sortedFiltered);
      } else {
        setFilteredBots(filtered);
      }
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
