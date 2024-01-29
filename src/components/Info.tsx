import React, { useEffect } from 'react';
import { pokemonTypes } from '../utils';
import { useAppDispatch } from '../app/hooks';
import { setPokemonTab } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/constants';
import { currentPokemonType, pokemonStatsType } from '../utils/types';
import styled from 'styled-components';

export default function Info({
  data,
}: {
  data: currentPokemonType | undefined;
}) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const progressBars = document.querySelectorAll('progress');
    progressBars.forEach((progressBar) => {
      progressBar.style.width = '10rem';
    });
  }, []);
  const createStatsArray = (types: string[], statType: string) => {
    const statsSet = new Set();
    types.forEach((type: string) => {
      // @ts-ignore
      pokemonTypes[type][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          statsSet.add(stat[0].toUpperCase() + stat.slice(1));
        }
      });
    });
    return Array.from(statsSet);
  };
  return (
    <>
      <Details>
        <h1 className="name">{data?.name}</h1>
        <h3>Tipo: {data?.types.join(' - ')}</h3>
        <h3>Evolução: {data?.evolutionLevel}</h3>
        <button onClick={() => dispatch(setPokemonTab(pokemonTabs.evolution))}>
          Veja a próxima evolução
        </button>
      </Details>
      <Stats>
        <ul>
          {data?.stats.map((stat: pokemonStatsType) => {
            return (
              <li key={stat.name}>
                {stat.name}: {stat.value}
                <progress max={100} value={stat.value} />
              </li>
            );
          })}
        </ul>
      </Stats>
      <BattleStats>
        {
          <ul>
            <li>
              <span>Forças:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  'strength'
                ).join(', ')}
              </span>
            </li>
            <li>
              <span>Fraquezas:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  'weakness'
                ).join(', ')}
              </span>
            </li>
            <li>
              <span>Resistencia:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  'resistance'
                ).join(', ')}
              </span>
            </li>
            <li>
              <span>Vulnerábilidade:</span>
              <span>
                {createStatsArray(
                  data?.types as unknown as string[],
                  'vulnerable'
                ).join(', ')}
              </span>
            </li>
          </ul>
        }
      </BattleStats>
    </>
  );
}

const Details = styled.div`
  transition: 2s ease-in-out;
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #000;
  font-weight: 700;
  background-color: rgba(236, 204, 27, 0.81);
  padding: 1rem;
  text-transform: uppercase;
  border-radius: 8px;
  width: 100%;

  .name {
    margin-bottom: 1rem;
  }
  button {
    position: absolute;
    right: 1rem;
    bottom: -3rem;
    padding: 0.8rem 0.8rem;
    border: 0.1rem solid var(--accent-color);
    outline: none;
    color: black;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1rem;
  }

  @media (min-width: 400px) {
    width: 320px;
  }
`;

const Stats = styled.div`
  position: absolute;
  top: 39rem;

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgba(236, 204, 27, 0.81);
    border-radius: 8px;
    border: 1px solid #000;
    li {
      color: #000;
      font-weight: 700;
      text-align: right;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      font-weight: 700;
      progress {
        transition: 2s ease-in-out;
        width: 0;
        height: 100%;
        -webkit-appearance: none;
        appearance: none;
        &::-webkit-progress-bar {
          border-radius: 1rem;
          height: 0.3rem;
          background-color: transparent;
        }
        &::-webkit-progress-value {
          border-radius: 1rem;
          background-color: var(--accent-color);
        }
      }
    }
  }

  @media (min-width: 800px) {
    top: 13rem;
    left: 5px;
  }

  @media (min-width: 1100px) {
    top: 15rem;
  }

  @media (min-width: 1230px) {
    top: 20rem;
    left: 5rem;
  }
`;

const BattleStats = styled.div`
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    letter-spacing: 0.1rem;
    li {
      display: grid;
      grid-template-columns: max-content 80%;
      gap: 0.5rem;
    }
  }
  position: absolute;
  top: 57rem;
  color: #000;
  font-weight: 700;
  padding: 1rem;
  width: 100%;
  background-color: rgba(236, 204, 27, 0.81);
  border-radius: 8px;
  border: 1px solid #000;
  overflow-x: scroll;

  .name {
    margin-bottom: 1rem;
  }
  .add-pokemon {
    position: absolute;
    right: -1rem;
    bottom: -2rem;
    padding: 0.8rem 0.8rem;
    background-color: transparent;
    border: 0.1rem solid var(--accent-color);
    outline: none;
    color: white;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: 0.1rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover {
      background-color: var(--accent-color);
    }
  }

  @media (min-width: 800px) {
    top: 25.5rem;
  }

  @media (min-width: 1100px) {
    top: 23rem;
    right: 3rem;
    width: 600px;
  }

  @media (min-width: 1230px) {
    top: 27rem;
  }
`;
