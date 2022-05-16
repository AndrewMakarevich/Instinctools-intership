import styled from 'styled-components';

export const StyledCloseButton = styled.button.attrs({ type: 'button' })`
  cursor: pointer;
  color: var(--extra-light);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  font-size: 1rem;
  transition: color 0.3s;
  &:hover,
  &:focus {
    color: var(--extra-dark);
  }
`;
