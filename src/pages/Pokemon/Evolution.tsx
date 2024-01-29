import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import PokemonCardGrid from '../../components/PokemonCardGrid';
import { getPokemonsData } from '../../app/reducers/getPokemonsData';
import Loader from '../../components/Loader';
import { genericPokemonType } from '../../utils/types';
import styled from 'styled-components';

function Evolution() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useAppDispatch();
  const pokemonData = useAppSelector(({ pokemon }) => pokemon);
  useEffect(() => {
    const fetchData = async () => {
      const pokemons: genericPokemonType[] =
        pokemonData.currentPokemon!.evolution.map(
          ({ pokemon }: { pokemon: genericPokemonType }) => pokemon
        );
      await dispatch(getPokemonsData(pokemons));
      setIsLoaded(true);
    };
    fetchData();
  }, [dispatch, pokemonData.currentPokemon]);

  return (
    <Page>
      {isLoaded ? (
        <PokemonCardGrid pokemons={pokemonData.randomPokemons!} />
      ) : (
        <Loader />
      )}
    </Page>
  );
}

export default Evolution;

const Page = styled.div`
  height: 100%;
  width: 100%;
`;
