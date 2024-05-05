// SortBar.js
import React, { useState } from 'react';

const botClasses = ['Support', 'Medic', 'Assault', 'Tank']; // Define available bot classes

function SortBar({ sortBy, filterByClass }) {
  const [selectedClasses, setSelectedClasses] = useState([]); // State to track selected classes

  const handleClassChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedClasses([...selectedClasses, value]); // Add class to selected classes
    } else {
      setSelectedClasses(selectedClasses.filter(c => c !== value)); // Remove class from selected classes
    }
    filterByClass(selectedClasses); // Call filterByClass with selected classes
  };

  return (
    <div>
      <h3>Sort By:</h3>
      <select onChange={(e) => sortBy(e.target.value)}>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
      <h3>Filter By Class:</h3>
      {botClasses.map((botClass, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={botClass}
            value={botClass}
            checked={selectedClasses.includes(botClass)}
            onChange={handleClassChange}
          />
          <label htmlFor={botClass}>{botClass}</label>
        </div>
      ))}
    </div>
  );
}

export default SortBar;
