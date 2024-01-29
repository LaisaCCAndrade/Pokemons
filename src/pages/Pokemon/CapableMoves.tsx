import React from 'react';
import { useAppSelector } from '../../app/hooks';
import styled from 'styled-components';

function CapableMoves() {
  const pokemonData = useAppSelector(
    ({ pokemon: { currentPokemon } }) => currentPokemon
  );
  return (
    <CapableMove>
      <h1 className="capable-moves-title">Habilidades</h1>
      <ul className="capable-moves-list ability">
        {pokemonData?.pokemonAbilities.abilities.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
      <h1 className="capable-moves-title">Movimentos</h1>
      <ul className="capable-moves-list">
        {pokemonData?.pokemonAbilities.moves.map((ability: string) => (
          <li className="move" key={ability}>
            {ability}
          </li>
        ))}
      </ul>
    </CapableMove>
  );
}

export default CapableMoves;

const CapableMove = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  .capable-moves-title {
    color: rgb(31, 30, 30);
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    padding: 1rem;
  }
  .capable-moves-list {
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 150px;
    gap: 1rem;
    padding: 1rem;
    width: 100%;
    overflow-y: scroll;

    .move {
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
      text-transform: uppercase;
    }
  }
  .ability {
    .move {
      background-color: var(--accent-color);
    }
  }
`;
