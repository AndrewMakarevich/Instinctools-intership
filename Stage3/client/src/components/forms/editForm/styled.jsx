import styled from 'styled-components';

const commonWrapperStyles = `  display: flex;
flex-direction: column;
flex-wrap: wrap;
justify-content: center;`;

export const StyledFormButtonsWrapper = styled.div`
  gap: 5px 10px;
  padding: 5px;
  ${commonWrapperStyles}
`;

export const StyledFormInputsWrapper = styled.div`
  gap: 25px 10px;
  ${commonWrapperStyles}
`;
