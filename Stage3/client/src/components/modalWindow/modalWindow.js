import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import CloseButton from '../../UI/closeButton/closeButton';
import modalStyles from './modalWindow.module.css';

const ModalWindow = ({
  modalWindowClassName,
  modalContentClassName,
  children,
  isOpen,
  setIsOpen,
  testId,
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

  useEffect(() => {
    return () => {
      document.removeEventListener('keydown', focusTrap);
      document.removeEventListener('keyup', focusTrap);
      document.removeEventListener('keyup', closeModalByKeyboard);
    };
  }, []);

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
          ref={lastFocusableElementRef}
          className={modalStyles['empty-btn']}
        ></button>
      </div>
    </div>
  );

  return createPortal(t, document.getElementById('root'));
};

export default ModalWindow;
