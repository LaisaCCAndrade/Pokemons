import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeFromCompare } from '../app/slices/PokemonSlice';
import { useAppDispatch } from '../app/hooks';
import { pokemonTypes } from '../utils';
import {
  pokemonStatType,
  pokemonTypeInterface,
  userPokemonsType,
} from '../utils/types';
import pokeballIcon from '../assets/pokeball-icon.png';
import styled from 'styled-components';

function CompareContainer({
  pokemon = undefined,
  isEmpty = false,
}: {
  pokemon?: userPokemonsType;
  isEmpty?: boolean;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const createStatsArray = (
    types: pokemonTypeInterface[],
    statType: pokemonStatType
  ) => {
    const statsArray: { name: string; image: string }[] = [];
    const statsSet = new Set<string>();
    types.forEach((type: pokemonTypeInterface) => {
      const key = Object.keys(type)[0];
      type[key][statType].forEach((stat: string) => {
        if (!statsSet.has(stat)) {
          // @ts-ignore
          statsArray.push({ name: stat, image: pokemonTypes[stat].image });
          statsSet.add(stat);
        }
      });
    });
    return statsArray;
  };
  const getStats = () => {
    return (
      <>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Forças</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, 'strength').map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Fraquezas</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, 'weakness').map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Resistencia</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, 'resistance').map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
        <div className="pokemon-types">
          <h4 className="pokemon-type-title">Vulnerabilidade</h4>
          <div className="pokemon-type-icons">
            {createStatsArray(pokemon?.types!, 'vulnerable').map(
              (stat: { image: string }) => (
                <div className="pokemon-type">
                  <img src={stat.image} alt="" className="pokemon-type-image" />
                </div>
              )
            )}
          </div>
        </div>
      </>
    );
  };
  return (
    <CompareContainers>
      {isEmpty && (
        <div className="empty">
          <button onClick={() => navigate('/search')}>
            <img src={pokeballIcon} alt="pokemon" className="plus-pokemon" />
          </button>
          <h3>Comparar Pokemon</h3>
        </div>
      )}
      {pokemon && (
        <CompareElements key={pokemon?.id}>
          <div className="compare-info">
            <div className="compare-details">
              <h3>{pokemon?.name}</h3>
              <img
                src={pokemon?.image}
                alt="pokemon"
                className="compare-image"
              />
            </div>
            <PokemonTypesContainer>
              <div className="pokemon-types">
                <h4 className="pokemon-type-title">Tipo</h4>
                <div className="pokemon-type-icons">
                  {pokemon?.types.map((type: pokemonTypeInterface) => {
                    const keys = Object.keys(type);
                    return (
                      <div className="pokemon-type">
                        <img
                          src={type[keys[0]].image}
                          alt="pokemon type"
                          className="pokemon-type-image"
                          loading="lazy"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              {getStats()}
            </PokemonTypesContainer>
          </div>
          <div className="compare-action-buttons">
            <button
              className="compare-btn"
              onClick={() => navigate(`/pokemon/${pokemon?.id}`)}
            >
              Ver
            </button>
            <button
              className="compare-btn"
              onClick={() => dispatch(removeFromCompare({ id: pokemon?.id }))}
            >
              Remover
            </button>
          </div>
        </CompareElements>
      )}
    </CompareContainers>
  );
}

export default CompareContainer;

const CompareContainers = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  .empty {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 3rem;
    height: 70%;
    background-color: rgba(236, 204, 27, 0.81);
    border: 1px solid #000;
    border-radius: 8px;
    width: 500px;
    margin: 93px auto;
    button {
      cursor: pointer;
      border-radius: 10rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      .plus-pokemon {
        width: 68px;
        color: rgb(232 79 75);
      }
    }
    h3 {
      color: black;
      text-transform: uppercase;
      letter-spacing: 0.3rem;
      font-size: 12px;
      text-align: center;
    }
  }
`;

const CompareElements = styled.div`
  height: 100%;
  width: 95%;
  display: grid;
  grid-template-rows: 80% 10%;
  grid-template-columns: 1fr;
  margin-top: 30px;
  .compare-info {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: rgba(236, 204, 27, 0.81);
    border-radius: 8px;
    border: 1px solid #000;
    display: grid;
    grid-template-rows: 40% 60%;
    .compare-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .compare-image {
        height: 6rem;
      }
    }
  }
  .compare-action-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    height: 60%;
    button {
      font-size: 1.2rem;
      font-weight: 400;
      text-transform: uppercase;
      border: none;
      color: #000;
      letter-spacing: 0.1rem;
      cursor: pointer;
      border: 1px solid #000;
      background-color: #e84f4b;
      transition: 0.3s ease-in-out;
      &:nth-of-type(1) {
        &:hover {
          background-color: #1f51ff;
          border-color: #1f51ff;
        }
      }
      &:nth-of-type(2) {
        &:hover {
          background-color: #27af0f;
          border-color: #27af0f;
        }
      }
      &:nth-of-type(3) {
        &:hover {
          background-color: #e21b5a;
          border-color: #e21b5a;
        }
      }
    }
  }
`;

const PokemonTypesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  max-height: 100%;
  overflow-y: scroll;
  overflow-x: scroll;
  padding-bottom: 1rem;
  .pokemon-types {
    display: grid;
    grid-template-columns: 25% 75%;
    gap: 2rem;
    width: 100%;
    .pokemon-type-title {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .pokemon-type-icons {
      display: flex;
      gap: 1rem;
      width: 100%;
      flex-wrap: wrap;
      .pokemon-type {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1rem;
        .pokemon-type-image {
          height: 3rem;
          width: 3rem;
        }
      }
    }
  }
`;
