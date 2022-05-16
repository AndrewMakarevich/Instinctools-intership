import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import {
  EmptyButton,
  ModalWindowCloseBtn,
  ModalWindowContainer,
  ModalWindowContentContainer,
  ModalWindowFrame,
} from './styled';

const ModalWindow = ({ modalContentStyles, children, isOpen, setIsOpen }) => {
  const firstFocusableElementRef = useRef(null);
  const lastFocusableElementRef = useRef(null);

  const closeModalByKeyboard = (e) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  const focusTrap = (e) => {
    if (e.key !== 'Tab') {
      return;
    }

    if (e.shiftKey) {
      if (e.target === firstFocusableElementRef.current) {
        lastFocusableElementRef.current.focus();
      }
      return;
    }

    if (e.target === lastFocusableElementRef.current) {
      e.preventDefault();
      firstFocusableElementRef.current.focus();
    }
  };
  useEffect(() => {
    if (isOpen) {
      firstFocusableElementRef.current.focus();
      document.addEventListener('keydown', focusTrap);
      document.addEventListener('keyup', focusTrap);
      document.addEventListener('keyup', closeModalByKeyboard);
    } else {
      document.removeEventListener('keyup', focusTrap);
      document.removeEventListener('keyup', closeModalByKeyboard);
    }
  }, [isOpen]);

  useEffect(
    () => () => {
      document.removeEventListener('keydown', focusTrap);
      document.removeEventListener('keyup', focusTrap);
      document.removeEventListener('keyup', closeModalByKeyboard);
    },
    [],
  );

  if (!isOpen) {
    return null;
  }

  const modal = (
    <ModalWindowContainer onClick={() => setIsOpen(false)}>
      <ModalWindowFrame onClick={(e) => e.stopPropagation()}>
        <ModalWindowCloseBtn
          ref={firstFocusableElementRef}
          onClick={() => setIsOpen(false)}
        />

        <ModalWindowContentContainer modalContentStyles={modalContentStyles}>
          {children}
        </ModalWindowContentContainer>

        <EmptyButton ref={lastFocusableElementRef} />
      </ModalWindowFrame>
    </ModalWindowContainer>
  );

  return createPortal(modal, document.getElementById('root'));
};

ModalWindow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalWindow;
