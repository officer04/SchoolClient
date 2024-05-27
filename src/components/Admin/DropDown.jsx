import React, { useState } from 'react';

const Dropdown = () => {
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {/* {selectedOption && <p>Selected option: {selectedOption}</p>} */}
      {/* <select value={selectedOption} onChange={handleSelectChange}>
        <option value="">Select an option</option>
        <option value="">Select an</option>
        <option value="">Select </option>
      </select> */}
    </div>
  );
};

export default Dropdown;
