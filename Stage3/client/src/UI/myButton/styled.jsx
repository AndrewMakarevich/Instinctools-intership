import styled from 'styled-components';

export const MyStyledButton = styled.button.attrs({ type: 'button' })`
  border-radius: 15px;
  border: 2px solid var(--extra-dark);
  background-color: transparent;
  color: var(--extra-dark);
  cursor: pointer;
  transition: background-color 0.3s, color 0.2s;
  &:hover {
    background-color: var(--extra-dark);
    color: var(--extra-light);
  }
  &:disabled {
    opacity: 0.6;
  }
`;
