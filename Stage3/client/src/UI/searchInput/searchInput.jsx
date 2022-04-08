import SearchIcon from '../../assets/icons/searchIcon/searchIcon';
import inputStyles from './searchInput.module.css';

const SearchInput = (props) => {
  const { className, ...restProps } = props;
  return (
    <label className={inputStyles.label}>
      <input className={`${inputStyles.input} ${className}`} {...restProps} />
      <span className={inputStyles.icon}><SearchIcon /></span>
    </label>

  );
};

export default SearchInput;
