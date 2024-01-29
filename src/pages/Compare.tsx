import React from 'react';
import Wrapper from '../sections/Wrapper';
import CompareContainer from '../components/CompareContainer';
import { useAppSelector } from '../app/hooks';
import styled from 'styled-components';

function Compare() {
  const { compareQueue } = useAppSelector(({ pokemon }) => pokemon);
  return (
    <Compares>
      <CompareContainer
        pokemon={compareQueue[0]}
        isEmpty={compareQueue.length < 1}
      />
      <CompareContainer
        pokemon={compareQueue[1]}
        isEmpty={compareQueue.length < 2}
      />
    </Compares>
  );
}

export default Wrapper(Compare);

const Compares = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  @media (min-width: 1020px) {
    flex-direction: row;
  }
`;
