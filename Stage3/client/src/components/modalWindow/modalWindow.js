import { useEffect } from 'react';
import modalStyles from './modalWindow.module.css';

const ModalWindow = ({
  modalWindowClassName,
  modalContentClassName,
  children,
  isOpen,
  setIsOpen,
}) => {
  useEffect(() => {
    const closeModalByKeyboard = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keyup', closeModalByKeyboard);

    return () => {
      document.removeEventListener('keyup', closeModalByKeyboard);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={modalStyles['modal-window__wrapper']}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={modalStyles['modal-window']}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={modalStyles['modal-window__close-btn']}
          onClick={() => setIsOpen(false)}
        >
          close
        </button>
        <div className={modalStyles['modal-window__content']}>{children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
