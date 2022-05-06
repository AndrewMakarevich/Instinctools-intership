import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import CloseButton from '../../UI/closeButton/closeButton';

import modalStyles from './modalWindow.module.css';

const ModalWindow = ({
  modalWindowClassName,
  modalContentClassName,
  children,
  isOpen,
  setIsOpen,
}) => {
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

  const t = (
    <div
      className={modalStyles['modal-window__wrapper']}
      onClick={() => setIsOpen(false)}
    >
      <div
        data-testid='modal-window'
        className={`${modalStyles['modal-window']} ${
          modalWindowClassName || ''
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseButton
          ref={firstFocusableElementRef}
          className={modalStyles['modal-window__close-btn']}
          onClick={() => setIsOpen(false)}
        />
        <div
          className={`${modalStyles['modal-window__content']} ${
            modalContentClassName || ''
          }`}
        >
          {children}
        </div>
        <button
          type='button'
          ref={lastFocusableElementRef}
          className={modalStyles['empty-btn']}
        />
      </div>
    </div>
  );

  return createPortal(t, document.getElementById('root'));
};

ModalWindow.propTypes = {
  modalWindowClassName: PropTypes.string,
  modalContentClassName: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element,
  ]),
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default ModalWindow;
