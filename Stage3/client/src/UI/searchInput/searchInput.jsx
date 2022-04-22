import PropTypes from 'prop-types';
import SearchIcon from '../../assets/icons/searchIcon/searchIcon';
import inputStyles from './searchInput.module.css';

const SearchInput = (props) => {
  const { className, ...restProps } = props;
  return (
    <label
      data-testid='search-input'
      htmlFor='search-input'
      className={inputStyles.label}
    >
      <input
        id='search-input'
        className={`${inputStyles.input} ${className}`}
        {...restProps}
      />
      <span className={inputStyles.icon}>
        <SearchIcon />
      </span>
    </label>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

SearchInput.defaultProps = {
  className: 'PropTypes.string',
};

export default SearchInput;
