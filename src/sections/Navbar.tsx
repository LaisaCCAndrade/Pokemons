import React, { useCallback, useEffect } from 'react';
import pokeballIcon from '../assets/pokeball-icon.png';
import { Link, useLocation } from 'react-router-dom';
import {
  clearSelectedType,
  resetRandomPokemons,
} from '../app/slices/PokemonSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import styled from 'styled-components';
import TypeFilter from '../components/TypeFilter';

export default function Navbar() {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigationRoutes = [
    {
      name: 'Pesquisar',
      route: '/search',
    },
    {
      name: 'Comparar',
      route: '/compare',
    },
    {
      name: 'Pokemon',
      route: '/pokemon',
    },
  ];
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selectedType = useAppSelector((state) => state.pokemon.selectedType);

  useEffect(() => {
    const index = navigationRoutes.findIndex(({ route }) =>
      location.pathname.includes(route)
    );
    ul(index);
  }, [location.pathname, navigationRoutes]);

  function ul(index: number) {
    var underlines = document.querySelectorAll<HTMLElement>('.underline');
    for (var i = 0; i < underlines.length; i++) {
      underlines[i].style.transform = 'translate3d(' + index * 100 + '%,0,0)';
    }
  }

  const handleTypeFilterClear = useCallback(() => {
    dispatch(clearSelectedType());
  }, [dispatch]);

  return (
    <Navebar>
      <div className="block">
        <img src={pokeballIcon} alt="" />
      </div>
      <div className="data">
        <ul>
          <div className="underline"></div>
          <div className="underline"></div>
          <div className="underline"></div>
          {navigationRoutes.map(({ name, route }, index) => (
            <Link
              to={route}
              key={index}
              onClick={(e) => dispatch(resetRandomPokemons())}
            >
              <li>{name}</li>
            </Link>
          ))}
          <TypeFilter
            selectedType={selectedType}
            onTypeClick={handleTypeFilterClear}
          />
        </ul>
      </div>
    </Navebar>
  );
}

const Navebar = styled.nav`
  display: grid;
  grid-template-columns: 5rem auto 5rem;
  border-bottom: 5px solid #465258;
  background-color: rgb(232 79 75);
  width: 100vw;
  height: 140px;
  .data {
    margin: 0px;
    border-top: none;
    border-bottom: none;
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      list-style-type: none;
      z-index: 1;
      position: relative;
      a {
        font-weight: 700;
        letter-spacing: 0.2rem;
        text-decoration: none;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid transparent;
        li {
          color: #202020;
          text-transform: uppercase;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          font-weight: 500;
          letter-spacing: 0.2rem;
          font-size: 16px;
        }
      }
    }

    @media (min-width: 800px) {
      ul {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      li {
        margin: 0 20px;
      }
    }

    @media (min-width: 900px) {
      ul {
        justify-content: space-evenly;
      }
    }
  }

  .block {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: white;
      font-size: 2rem;
      cursor: pointer;
    }
    img {
      cursor: pointer;
      height: 3rem;
    }
  }

  @media (min-width: 800px) {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }

  @media (min-width: 1100px) {
    display: grid;
    grid-template-columns: 5rem auto 5rem;
  }
`;
