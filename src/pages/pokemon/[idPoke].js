import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../../styles/PokeDesc.module.scss';

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
    <div className={styles.pokedexContainer}>
      {pokemon ? (
        <div className={styles.pokemonCard}>
          <div className={styles.pokemonImage}>
            <img src={pokemon.images[currentImage]} alt={`${pokemon.name} ${currentImage}`} onClick={handleClick} className={styles.pokeImageDesc} />
          </div>

          <div className={styles.pokemonDetails}>
            <h1 className={styles.pokedexTitle}>{pokemon.name}</h1>
            <p className={styles.pokemonAbilities}><strong>Abilities:</strong> {pokemon.abilities.join(', ')}</p>
            <p className={styles.pokemonMoves}><strong>Moves:</strong> {pokemon.moves.join(', ')}</p>
          </div>
          <div className={styles.backButtonContainer}>
            <Link href={`/`}><button className={styles.backButton}>Back</button></Link>
          </div>
        </div>
      ) : (
        <div className={styles.loading}>Cargando...</div>
      )}
    </div>
  );
}

export default DetailsPoke;