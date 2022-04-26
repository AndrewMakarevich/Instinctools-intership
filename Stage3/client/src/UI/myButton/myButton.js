import buttonStyles from './myButton.module.css';

const MyButton = ({ className, children, onClick, ...restProps }) => {
  return (
    <button
      className={`${buttonStyles['my-button']} ${className || ''}`}
      onClick={(e) => {
        e.preventDefault();

        if (onClick) {
          onClick(e);
        }
      }}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default MyButton;
