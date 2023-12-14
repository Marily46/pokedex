import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/Details.module.scss';

function DetailsPoke() {
  const router = useRouter();
  const { idPoke } = router.query;
  const [pokemon, setPokemon] = useState();
  const [currentImage, setCurrentImage] = useState('front');

  useEffect(() => {
    fetch('/pokemons.json')
      .then((res) => res.json())
      .then((data) => {
        const pokeData = data.find((pokemon) => pokemon.id === Number(idPoke));
        setPokemon(pokeData);
      });
  }, [idPoke]);

  const handleClick = () => {
    setCurrentImage(prev => prev === 'front' ? 'side' : prev === 'side' ? 'back' : 'front');
  }

  return (
    <div className="pokemon-container">
      {pokemon ? (
        <div>
          <div>
            <img src={pokemon.images[currentImage]} alt={`${pokemon.name} ${currentImage}`} onClick={handleClick} />
          </div>

          <div className="pokemon-details">
            <h1 className="pokedexTitle">{pokemon.name}</h1>
            <p>Abilities: {pokemon.abilities.join(', ')}</p>
            <p>Moves: {pokemon.moves.join(', ')}</p>

            <div className="stats">

            </div>

            <div className="types">

            </div>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default DetailsPoke;