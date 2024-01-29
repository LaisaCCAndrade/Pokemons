import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { setSelectedType } from '../app/slices/PokemonSlice';
import styled from 'styled-components';
import { pokemonTypes } from '../utils';

interface TypeFilterProps {
  selectedType: string | null;
  onTypeClick: (type: string) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ selectedType }) => {
  const dispatch = useAppDispatch();

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    dispatch(setSelectedType(selectedType));
  };

  return (
    <FilterContainer>
      <span>Filtrar por tipo:</span>
      <select value={selectedType || ''} onChange={handleFilterChange}>
        <option value="">Todos</option>
        {Object.keys(pokemonTypes).map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </FilterContainer>
  );
};

export default TypeFilter;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  color: #202020;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  font-weight: 500;
  letter-spacing: 0.2rem;
  font-size: 16px;

  select {
    margin-left: 10px;
    color: #202020;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    padding: 5px;
  }

  option {
    color: #202020;
    text-transform: uppercase;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    font-size: 16px;
  }

  @media (min-width: 800px) {
    flex-direction: row;
  }
`;
