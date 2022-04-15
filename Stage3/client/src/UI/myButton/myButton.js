import buttonStyles from './myButton.module.css';

const MyButton = ({ className, children, ...restProps }) => {
  return (
    <button
      className={`${buttonStyles['my-button']} ${className || ''}`}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default MyButton;
