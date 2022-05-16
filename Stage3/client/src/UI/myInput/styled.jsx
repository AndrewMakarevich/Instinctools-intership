import styled from 'styled-components';

export const MyStylesInputLabel = styled.label.attrs({
  'data-testid': 'my-label-input',
})`
  display: flex;
  align-items: center;
  position: relative;
`;

export const MyStyledInput = styled.input.attrs((props) => ({
  placeholder: props.placeholder ? props.placeholder : ' ',
}))`
  border-radius: 15px;
  border: none;
  background-color: var(--extra-light);
  padding: 5px 7px;

  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);

  transition: background-color 0.2s, color 0.3s;

  font-size: 1rem;

  &:focus {
    outline: none;
    background-color: var(--medium-dark);
    color: var(--extra-light);
  }
`;

export const LabelText = styled.span`
  position: absolute;
  left: 5px;
  bottom: 50%;
  transform: translateY(50%);
  align-self: center;
  color: var(--extra-dark);
  pointer-events: none;
  transition: 0.2s;

  ${MyStyledInput}:focus ~ &,
  ${MyStyledInput}:not(:placeholder-shown) ~ & {
    transform: translateY(-50%);
    bottom: 75%;
  }
`;
