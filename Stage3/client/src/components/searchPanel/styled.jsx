import styled from 'styled-components';

export const StyledSearchPanel = styled.section.attrs({
  'data-testid': 'search-panel',
})`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  gap: 5px 10px;
`;

export const StyledInputsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px 10px;
`;
