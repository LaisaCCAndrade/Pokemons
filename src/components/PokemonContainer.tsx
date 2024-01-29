import React from 'react';
import styled from 'styled-components';

export default function PokemonContainer({ image }: { image: string }) {
  return (
    <>
      <CicleContainer>
        <div className="outer-circle">
          <div className="inner-circle">
            <img src={image} alt="" />
          </div>
          <div className="lines">
            <div className="line line-1"></div>
            <div className="line line-2"></div>
          </div>
        </div>
      </CicleContainer>
    </>
  );
}

const CicleContainer = styled.div`
  display: flex;
  margin-top: 3rem;

  .outer-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 24rem;
    width: 100%;
    border: 0.2rem solid var(--accent-color);
    border-radius: 50rem;
    position: relative;
    margin-top: 50%;
  }
  .inner-circle {
    height: 20rem;
    width: 20rem;
    border: 0.3rem solid var(--accent-color);
    border-radius: 40rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-inline-size: 100%;
      block-size: auto;
      z-index: 100;
      height: 17rem;
    }
  }
  .lines {
    display: flex;
    gap: 3rem;
    position: absolute;
    .line {
      height: 28rem;
      width: 0.3rem;
      background-color: var(--accent-color);
      transform: rotate(45deg);
    }
  }

  @media (min-width: 400px) {
    .outer-circle {
      width: 24rem;
    }
  }

  @media (min-width: 800px) {
    margin-top: -12rem;
    margin-left: 20rem;
  }

  @media (min-width: 1200px) {
    margin-top: -7rem;
    margin-left: 5rem;
  }
`;
