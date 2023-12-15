import React from 'react'

export const SearchPoke = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (inputValue.trim().toLowerCase()) {
      onSearch(inputValue.trim().toLowerCase());
      setError(null);
    } else {
      setError(`Pokémon ${inputValue} not found`);
    }
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
      {error && <p>{error}</p>}
    </div>
  );
}
