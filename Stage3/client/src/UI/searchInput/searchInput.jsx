import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledSearchInput,
  StyledSearchInputIcon,
  StyledSearchInputLabel,
} from './styled';

const SearchInput = (props) => {
  const { className, ...restProps } = props;
  return (
    <StyledSearchInputLabel>
      <StyledSearchInput
        id='search-input'
        className={className}
        {...restProps}
      />
      <StyledSearchInputIcon />
    </StyledSearchInputLabel>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
};

SearchInput.defaultProps = {
  className: 'PropTypes.string',
};

export default SearchInput;
