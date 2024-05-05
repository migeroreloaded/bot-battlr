import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BotSpecs({ enlistBot }) {
  const navigate = useNavigate(); // Replace useHistory with useNavigate
  const { botId } = useParams(); // Get botId from URL params

  const handleEnlist = () => {
    enlistBot(botId); // Enlist the bot with its ID
    navigate('/'); // Redirect back to the list view using useNavigate
  };

  const handleBack = () => {
    navigate('/'); // Redirect back to the list view using useNavigate
  };

  return (
    <div>
      <h2>Bot Specs</h2>
      <p>Bot ID: {botId}</p>
      {/* Display other bot details here */}
      <button onClick={handleEnlist}>Enlist Bot</button>
      <button onClick={handleBack}>Back to List</button>
    </div>
  );
}

export default BotSpecs;
