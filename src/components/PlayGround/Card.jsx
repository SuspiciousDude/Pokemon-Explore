import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "/src/styles/Card.module.css";

const Card = ({pokemon}) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [moveDescription, setMoveDescription] = useState([]);

  // All pokemon types icons
  const typeIcons = {
    normal: '/src/assets/Type/Normal.png',
    fire: '/src/assets/Type/Fire.png',
    water: '/src/assets/Type/Water.png',
    electric: '/src/assets/Type/Electric.png',
    grass: '/src/assets/Type/Grass.png',
    ice: '/src/assets/Type/Ice.png',
    fighting: '/src/assets/Type/Fighting.png',
    poison: '/src/assets/Type/Poison.png',
    dragon: '/src/assets/Type/Dragon.png'
  }

  // UseEffect to get pokemon data for the card to show
  useEffect(() => {
    const getPokemonData = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
        setPokemonData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getPokemonData();
  }, [pokemon]);

  // UseEffect to get move description for the pokemon
  useEffect(() => {
    const getMoveDescription = async () => {
      if (pokemonData) {
        const move = pokemonData.moves[0];
        const response = await axios.get(move.move.url);
        const englishDescription = response.data.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );
        setMoveDescription(englishDescription ? englishDescription.flavor_text : '');
      }
    };
  
    getMoveDescription();
  }, [pokemonData]);
  

  // Renders loading card untill the card data is loaded
  if (!pokemonData || !moveDescription) {
    return <div className={styles.card} >Loading...</div>;
  }

  // Converts pokemon name to title case
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.left_section}>
        <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      </div>
      <div className={styles.right_section}>
        <div className={styles.title}>{toTitleCase(pokemonData.name)}</div>
        <div className={styles.details}>
          <div className={styles.hp}>HP: {pokemonData.stats.find(stat => stat.stat.name === 'hp').base_stat}</div>
          <div className={styles.attack}>Attack: {pokemonData.stats.find(stat => stat.stat.name === 'attack').base_stat}</div>
        </div>
        <div className={styles.move}>
          <div className={styles.move_title}>{toTitleCase(pokemonData.moves[0].move.name)}</div>
          <div className={styles.move_description}>{moveDescription}</div>
        </div>
        <div className={styles.type_badge}>
        <img src={typeIcons[pokemonData.types[0].type.name]} alt="Type Badge" />
      </div>
      </div>
    </div>
  );
}

export default Card;