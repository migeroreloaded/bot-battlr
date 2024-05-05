import React from 'react';

function YourBotArmy({ army, releaseBot, dischargeBot }) {
  const handleRelease = (bot) => {
    releaseBot(bot);
  };

  const handleDischarge = (bot) => {
    dischargeBot(bot);
  };

  return (
    <div>
      <h2>Your Bot Army</h2>
      <div className="army-list">
        {army.map(bot => (
          <div key={bot.id} className="bot-profile">
            <img src={bot.avatar_url} alt={bot.name} />
            <h3>{bot.name}</h3>
            <p>Health: {bot.health}</p>
            <p>Damage: {bot.damage}</p>
            <p>Armor: {bot.armor}</p>
            <p>Class: {bot.bot_class}</p>
            <p>Catchphrase: {bot.catchphrase}</p>
            <button onClick={() => handleRelease(bot)}>Release</button>
            <button onClick={() => handleDischarge(bot)} className="delete-button">X</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourBotArmy;
