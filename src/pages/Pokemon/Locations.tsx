import React from 'react';
import { useAppSelector } from '../../app/hooks';
import styled from 'styled-components';

function Locations() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <PokemonLocations>
      <ul className="pokemon-locations-list">
        {pokemonData?.encounters.map((encounter: string) => (
          <li key={encounter} className="pokemon-location">
            {encounter}
          </li>
        ))}
      </ul>
    </PokemonLocations>
  );
}

export default Locations;

const PokemonLocations = styled.div`
  width: 100%;
  height: 100%;
  .pokemon-locations-list {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 150px;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    overflow-y: scroll;
    height: 100%;
    .pokemon-location {
      height: 100%;
      padding: 2rem;
      font-size: x-large;
      background-color: rgba(255, 255, 255, 0.125);
      border-radius: 1rem;
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      color: #000;
      background-color: rgba(236, 204, 27, 0.81);
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      cursor: pointer;
    }
  }
`;
