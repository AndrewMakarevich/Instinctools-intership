import styled from 'styled-components';
import CloseButton from '../../UI/closeButton/closeButton';

export const ModalWindowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalWindowFrame = styled.div.attrs({
  'data-testid': 'modal-window',
})`
  min-width: 40%;
  max-width: 95%;
  min-height: 50%;
  max-height: 70%;
  background-color: var(--medium-dark);
  border-radius: 15px;
  padding: 15px;
  overflow: hidden;
`;

export const ModalWindowCloseBtn = styled(CloseButton)``;

export const ModalWindowContentContainer = styled.div`
  ${(props) => Boolean(props.modalContentStyles) && props.modalContentStyles}
`;

export const EmptyButton = styled.button.attrs({ type: 'button' })`
  border: none;
  padding: 0;
`;
