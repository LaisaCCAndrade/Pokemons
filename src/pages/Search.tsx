// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Wrapper from '../sections/Wrapper';
import { debounce } from '../utils';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getInitialPokemonData } from '../app/reducers/getInitialPokemonData';
import { getPokemonsData } from '../app/reducers/getPokemonsData';
import Loader from '../components/Loader';
import { setLoading } from '../app/slices/AppSlice';

import PokemonCardGrid from '../components/PokemonCardGrid';
import styled from 'styled-components';
import { string, object } from 'zod';

const PokemonNameSchema = object({
  name: string()
    .min(1, { message: 'O nome do Pokemon deve ter pelo menos 1 caractere.' })
});

function Search() {
  const handleChange = debounce((value: string) => getPokemon(value), 300);
  const isLoading = useAppSelector(({ app: { isLoading } }) => isLoading);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  }, [allPokemon, dispatch]);

  useEffect(() => {
    if (randomPokemons) {
      dispatch(setLoading(false));
    }
  }, [randomPokemons, dispatch]);

  const getPokemon = async (value: string) => {
    try {
      // Validar o valor inserido usando o esquema do Zod
      PokemonNameSchema.parse({ name: value });

      setErrorMessages([]); // Limpar mensagens de erro se a validação for bem-sucedida

      if (value.length) {
        const pokemons = allPokemon.filter((pokemon) =>
          pokemon.name.includes(value.toLowerCase())
        );
        dispatch(getPokemonsData(pokemons));
      } else {
        const clonedPokemons = [...allPokemon];
        const randomPokemonsId = clonedPokemons
          .sort(() => Math.random() - Math.random())
          .slice(0, 20);
        dispatch(getPokemonsData(randomPokemonsId));
      }
    } catch (error) {
      // O valor inserido não atende aos critérios do esquema
      const errorMessages = error.errors.map((err: any) => err.message);
      setErrorMessages(errorMessages);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Searchs>
          <input
            type="text"
            onChange={(e) => handleChange(e.target.value)}
            className="pokemon-searchbar"
            placeholder="Pesquisar Pokemon"
          />
          {errorMessages.length > 0 && (
  <ErrorMessage>
    {errorMessages.map((message, index) => (
      <p key={message}>{message}</p>
    ))}
  </ErrorMessage>
)}
          <PokemonCardGrid pokemons={randomPokemons} />
        </Searchs>
      )}
    </>
  );
}

export default Wrapper(Search);

const Searchs = styled.div`
  height: 100%;
  width: 100%;
  max-width: 100%;
  color: white;
  text-transform: uppercase;
  .pokemon-searchbar {
    background-color: rgb(243 243 243);
    outline: none;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    width: 100%;
    height: 9%;
    color: #000;
    font-size: 15px;
    padding-left: 1rem;
    &::-webkit-input-placeholder {
      color: #000;
    }
  }
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  p {
    margin: 0;
  }
`;
