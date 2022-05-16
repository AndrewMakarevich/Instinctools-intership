import styled from 'styled-components';
import MyInput from '../../UI/myInput/myInput';

export const StyledPaginationLine = styled.div.attrs({
  'data-testid': 'pagination-line',
})`
  display: flex;
  justify-content: center;
  column-gap: 3px;
`;

export const StyledCustomPageInputWrapper = styled.div`
  position: relative;
`;

export const StyledCustomPageInput = styled(MyInput).attrs({
  type: 'number',
  placeholder: 'Page number',
  title: 'Enter tour page here',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  width: 35px;
  height: 25px;
  transition: width 0.2s, background 0.2s, color 0.2s;

  &:focus,
  &:hover {
    width: 120px;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StyledPaginationButton = styled.button.attrs({
  'data-testid': 'pagination-btn',
  type: 'button',
})`
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.2s, background-color 0.3s;

  ${(props) =>
    props.isActive &&
    `  background-color: var(--medium-dark);
  color: var(--extra-dark);`}

  &:hover,
  &:focus {
    background-color: var(--extra-dark);
    color: var(--extra-light);
  }
`;
