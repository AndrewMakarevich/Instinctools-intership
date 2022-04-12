import inputStyles from './myInput.module.css';

const MyInput = ({ className, children, placeholder, ...restProps }) => {
  return (
    <input
      className={`${inputStyles['my-input']} ${className || ''}`}
      placeholder={placeholder || ' '}
      {...restProps}
    >
      {children}
    </input>
  );
};

export default MyInput;
