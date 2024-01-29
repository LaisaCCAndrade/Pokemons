import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setPokemonTab } from '../app/slices/AppSlice';
import { pokemonTabs } from '../utils/constants';
import styled from 'styled-components';

export default function Footer() {
  const location = useLocation();
  const currentPokemonTab = useAppSelector(
    ({ app: { currentPokemonTab } }) => currentPokemonTab
  );
  const dispatch = useAppDispatch();

  const routes = [
    {
      name: pokemonTabs.description,
      value: 'Descrição',
    },
    {
      name: pokemonTabs.evolution,
      value: 'Evolução',
    },
    {
      name: pokemonTabs.locations,
      value: 'Localização',
    },
    {
      name: pokemonTabs.moves,
      value: 'Movimentos',
    },
  ];
  return (
    <Footers>
      <div className="block"></div>
      <div className="data">
        {location.pathname.includes('/pokemon') && (
          <ul>
            {routes.map((route) => (
              <li
                key={route.name}
                className={`${
                  currentPokemonTab === route.name ? 'active' : ''
                }`}
                onClick={() => dispatch(setPokemonTab(route.name))}
              >
                {route.value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </Footers>
  );
}

const Footers = styled.footer`
  border-top: 0.5px solid rgba(255, 255, 255, 0.203);
  border-top: 5px solid #465258;
  background-color: rgb(243 243 243);
  height: 150px;
  .block {
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 0.5px solid rgba(255, 255, 255, 0.203);

    svg {
      cursor: pointer;
      font-size: 2.5rem;
    }
  }
  .data {
    margin: 0px;
    border-top: none;
    border-bottom: none;
    ul {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      height: 95px;
      list-style-type: none;
      li {
        color: #202020;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: var(--accent-color);
        }
      }
      .active {
        background-color: var(--accent-color);
      }
    }
  }
`;
