import React, { useState } from 'react';

const botClasses = ["Support", "Medic", "Assault", "Defender", "Captain", "Witch"]; // Define available bot classes

function SortBar({ sortBy, filterByClass }) {
  const [selectedClasses, setSelectedClasses] = useState([]); // State to track selected classes

  const handleClassChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedClasses(prevSelectedClasses => [...prevSelectedClasses, value]); // Add class to selected classes
    } else {
      setSelectedClasses(prevSelectedClasses => prevSelectedClasses.filter(c => c !== value)); // Remove class from selected classes
    }
    filterByClass(checked ? [...selectedClasses, value] : selectedClasses.filter(c => c !== value)); // Pass updated selected classes to filterByClass
  };
  
 
  const handleSortChange = (event) => {
    const { value } = event.target;
    if (value === 'All') {
      sortBy(null); // Pass null or any other value that represents "All" to indicate no sorting
    } else {
      sortBy(value); // Call sortBy with selected attribute
    }
  };

  return (
    <div>
      <h3>Sort By:</h3>
      <select onChange={(e) => handleSortChange(e)}>
        <option value="All">---None---</option>
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
