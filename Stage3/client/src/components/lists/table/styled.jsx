import styled from 'styled-components';
import MyButton from '../../../UI/myButton/myButton';

export const StyledTableWrapper = styled.article.attrs({
  'data-testid': 'table-wrapper',
})`
  display: flex;
  flex-direction: column;
  row-gap: 10px;
`;

export const StyledTable = styled.table.attrs({ 'data-testid': 'table' })`
  position: relative;

  &:before {
    z-index: 3;
    content: 'Loading';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.664);
    color: var(--extra-light);
    font-weight: 500;
    ${(props) =>
      props.isLoading
        ? 'animation: appear 0.2s forwards;'
        : `
            opacity: 0;
            pointer-events: none;
          `}
  }

  @media (max-width: 425px) {
    .table {
      font-size: 0.5rem;
    }
  }

  @keyframes appear {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`;

export const StyledTableRow = styled.tr.attrs({ 'data-testid': 'table-row' })`
  background-color: rgba(0, 0, 0, 0.616);
  color: var(--extra-light);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(0, 0, 0);
  }
`;

export const StyledTableCell = styled.td`
  padding: 5px 10px;
`;

export const StyledActionButton = styled(MyButton).attrs({
  'data-testid': 'group-row-action-btn',
})`
  && {
    color: var(--extra-light);
  }
`;
