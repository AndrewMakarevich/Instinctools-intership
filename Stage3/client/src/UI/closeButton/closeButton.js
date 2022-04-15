import buttonStyles from './closeButton.module.css';

const CloseButton = ({ className, ...restProps }) => {
  return (
    <button
      className={`${buttonStyles['close-button']} ${className || ''}`}
      {...restProps}
    >
      ✕
    </button>
  );
};

export default CloseButton;
