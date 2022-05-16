import React from 'react';
import styled from 'styled-components';
import SearchIcon from '../../assets/icons/searchIcon/searchIcon';

export const StyledSearchInputLabel = styled.label.attrs({
  'data-testid': 'search-input',
})`
  position: relative;
  display: flex;
  align-items: center;
`;

export const StyledSearchInput = styled.input.attrs()`
  border: none;
  border-radius: 15px;
  padding: 3px 5px 3px 25px;
`;

export const StyledSearchInputIcon = styled.span.attrs({
  children: <SearchIcon />,
})`
  position: absolute;
  left: 5px;
  ${StyledSearchInput}:focus ~ & {
    animation: toggle 0.3s forwards;
  }

  @keyframes toggle {
    50% {
      transform: rotate(-15deg);
    }

    75% {
      transform: rotate(15deg);
    }

    100% {
      transform: rotate(0deg);
    }
  }
`;
