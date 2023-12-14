import React from 'react'

export const SearchPoke = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    onSearch(inputValue.trim().toLowerCase());
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter Pokémon name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
