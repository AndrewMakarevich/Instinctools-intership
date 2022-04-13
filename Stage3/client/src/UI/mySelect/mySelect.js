import selectStyles from './mySelect.module.css';

const MySelect = ({ className, children, ...restProps }) => (
  <select
    className={`${selectStyles['my-select']} ${className | ''}`}
    {...restProps}
  >
    {children}
  </select>
);

export default MySelect;
