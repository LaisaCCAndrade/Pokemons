import React from 'react';
import pokeballLoader from '../assets/pokeball-loader.gif';
import styled from 'styled-components';
function Loader() {
  return (
    <Loaders>
      <img src={pokeballLoader} alt="" />
    </Loaders>
  );
}

export default Loader;

const Loaders = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
