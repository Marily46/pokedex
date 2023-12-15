import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Details.module.scss';
import { useEffect, useState } from 'react';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/pokemons.json')
      .then(response => response.json())
      .then(data => setPokemons(data));
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Poke App</title>
        <meta name='description' content='Pokedex Application' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.pokedexContainer}>
        <h1 className={styles.pokedexTitle}>Pokédex 1GEN</h1>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            value={search} 
            onChange={handleSearchChange} 
            placeholder="Search Pokémon"
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className={styles.searchButton}>Search</button>
        </div>
        {loading && <p className={styles.loading}>Loading...</p>}
        {searchResults && (
          <div className={styles.searchResults}>
          <img src={searchResults?.sprites?.front_default} alt={searchResults?.name} className={styles.pokemonImage} />
          <h2 className={styles.pokemonName}>{searchResults?.name}</h2>
          <p className={styles.pokemonInfo}>Abilities: {searchResults?.abilities?.map(ability => ability.ability.name).join(', ')}</p>
          <p className={styles.pokemonInfo}>Moves: {searchResults?.moves?.map(move => move.move.name).join(', ')}</p>
        </div>
        )}
        <section className={styles.pokemonList}>
          {pokemons.map(pokemon => (
            <div key={pokemon.id} className={styles.pokemonCard}>
              <img src={pokemon.images.front} alt={pokemon.name} className={styles.pokemonImage} />
              <div className='pokemon-details'>
                <h2 className={styles.pokemonName}>{pokemon.name}</h2>
                <Link href={`/pokemon/${pokemon.id}`}><button className={styles.searchButton}>Pokemon Details</button></Link>
            </div>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
