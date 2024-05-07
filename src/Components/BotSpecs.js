import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BotSpecs({ enlistBot }) {
  const navigate = useNavigate();
  const { botId } = useParams();
  const [bot, setBot] = useState(null); // State to store the bot data

  // Use when running json-server --watch db.json --port 4000
  // useEffect(() => {
  //   // Fetch bot data based on botId
  //   fetch(`http://localhost:4000/bots/${botId}`)
  //     .then(response => response.json())
  //     .then(data => setBot(data))
  //     .catch(error => console.error('Error fetching bot data:', error));
  // }, [botId]); // Trigger effect whenever botId changes

  useEffect(() => {
    // Fetch bot data based on botId
    fetch(`https://migeroreloaded.github.io/bot-battlr-json/db.json`)
      .then(response => response.json())
      .then(data => {
        // Find the bot with the matching ID
        const foundBot = data.bots.find(bot => bot.id === botId);
        if (foundBot) {
          setBot(foundBot); // Set the found bot as the state
        } else {
          console.error(`Bot with ID ${botId} not found.`);
        }
      })
      .catch(error => console.error('Error fetching bot data:', error));
  }, [botId]); // Trigger effect whenever botId changes
  

  const handleEnlist = () => {
    enlistBot(bot); // Enlist the fetched bot data
    navigate('/'); // Redirect back to the list view using useNavigate
  };

  const handleBack = () => {
    navigate('/'); // Redirect back to the list view using useNavigate
  };

  if (!bot) {
    return <div>Loading...</div>; // Render loading message while fetching bot data
  }

  return (
    <div>
      <h2>Bot Specs</h2>
      <img src={bot.avatar_url} alt={bot.name} />
      <h3>{bot.name}</h3>
      <p>Health: {bot.health}</p>
      <p>Damage: {bot.damage}</p>
      <p>Armor: {bot.armor}</p>
      <p>Class: {bot.bot_class}</p>
      <p>Catchphrase: {bot.catchphrase}</p>
      <button onClick={handleEnlist}>Enlist Bot</button>
      <button onClick={handleBack}>Back to List</button>
    </div>
  );
}

export default BotSpecs;
