import React from 'react';
import { IoGitCompare } from 'react-icons/io5';
import { addToCompare, setCurrentPokemon } from '../app/slices/PokemonSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { useNavigate } from 'react-router-dom';
import { setPokemonTab, setToast } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/constants';
import { pokemonTypeInterface, userPokemonsType } from '../utils/types';
import styled from 'styled-components';

function PokemonCardGrid({ pokemons }: { pokemons: userPokemonsType[] }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedType = useAppSelector((state) => state.pokemon.selectedType);

  const filterPokemonByType = (pokemon: userPokemonsType) => {
    if (!selectedType) {
      return true;
    }

    return pokemon.types.some((type) => Object.keys(type)[0] === selectedType);
  };

  const filteredPokemon = pokemons?.filter(filterPokemonByType) || [];

  return (
    <PokemonCardContainer>
      <PokemonCard>
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((data: userPokemonsType) => (
            <div key={data.id} className="pokemon-card">
              <div className="pokemon-card-compare">
                <IoGitCompare
                  onClick={() => {
                    dispatch(addToCompare(data));
                    dispatch(
                      setToast(
                        `${data.name} foi adicionado à fila de comparação.`
                      )
                    );
                  }}
                />
              </div>
              <h3 className="pokemon-card-title">{data.name}</h3>
              <img
                src={data.image}
                alt=""
                className="pokemon-card-image"
                loading="lazy"
                onClick={() => {
                  dispatch(setPokemonTab(pokemonTabs.description));
                  dispatch(setCurrentPokemon(undefined));
                  navigate(`/pokemon/${data.id}`);
                }}
              />
              <div className="pokemon-card-types">
                {data.types.map((type: pokemonTypeInterface, index: number) => {
                  const keys = Object.keys(type);
                  return (
                    <div className="pokemon-card-types-type" key={index}>
                      <img
                        src={type[keys[0]].image}
                        alt="pokemon type"
                        className="pokemon-card-types-type-image"
                        loading="lazy"
                      />
                      <h6 className="pokemon-card-types-type-text">
                        {keys[0]}
                      </h6>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <NotPokemon>
            {selectedType
              ? 'Nenhum Pokémon encontrado com o tipo selecionado.'
              : 'Pokemon não encontrado.'}
          </NotPokemon>
        )}
      </PokemonCard>
    </PokemonCardContainer>
  );
}

export default PokemonCardGrid;

const PokemonCardContainer = styled.div`
  max-height: 93%;
  overflow-y: scroll;
  color: white;
  text-transform: uppercase;
`;

const PokemonCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin: 10px 0;
  justify-items: center;
  .pokemon-card {
    width: 230px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(236 204 27 / 81%);
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    position: relative;
    height: 270px;
    svg {
      transition: 0.3s ease-in-out;
      &:hover {
        font-size: 2rem;
      }
    }
    &-list {
      position: absolute;
      top: 0.7rem;
      left: 0.8rem;
      font-size: 1rem;
      cursor: pointer;
      .trash {
        color: #e21b5a;
      }
      .plus {
        color: #27af0f;
      }
    }
    &-compare {
      position: absolute;
      top: 0.5rem;
      right: 0.8rem;
      font-size: 1.3rem;
      cursor: pointer;
      svg {
        color: #1f51ff;
      }
    }
    &-title {
      text-align: center;
      cursor: pointer;
      margin-top: 1rem;
    }
    &-image {
      height: 7rem;
      filter: drop-shadow(20px 10px 10px #14121281);
      cursor: pointer;
    }

    &-types {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
      gap: 1rem;
      &-type {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 0.5rem;
        gap: 0.4rem;
        &-image {
          height: 2rem;
        }
        &-text {
          font-size: smaller;
        }
      }
    }
  }

  @media (min-width: 550px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const NotPokemon = styled.p`
  color: red;
  font-weight: 700;
  margin-top: 30px;
`;
