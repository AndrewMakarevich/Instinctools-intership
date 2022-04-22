import MyInput from './myInput';
import inputStyles from './myInput.module.css';

const MyInputWithLabel = ({
  labelClassName,
  labelText,
  spanClassName,
  className,
  ...restProps
}) => {
  return (
    <label
      data-testid='my-label-input'
      className={`${inputStyles['label']} ${labelClassName || ''}`}
    >
      <MyInput className={className} {...restProps} />
      <span className={spanClassName}>{labelText}</span>
    </label>
  );
};

export default MyInputWithLabel;
