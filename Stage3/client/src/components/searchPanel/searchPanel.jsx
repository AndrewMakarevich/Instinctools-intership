import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../UI/myButton/myButton';
import SearchInput from '../../UI/searchInput/searchInput';

import { StyledInputsWrapper, StyledSearchPanel } from './styled';

const SearchPanel = ({
  paramsMap,
  queryParams,
  fetchFunction,
  clearFieldsFunction,
}) => {
  const filterObjectIsEmpty = () =>
    !Object.values(queryParams.filterObject).some((value) => value !== '');

  const setParamAndSendRequest = async (e, param) => {
    const newQueryParamsObj = {
      ...queryParams,
      filterObject: {
        ...queryParams.filterObject,
        [param]: e.target.value,
      },
      page: 1,
    };
    await fetchFunction(newQueryParamsObj, e);
  };

  return (
    <StyledSearchPanel>
      <StyledInputsWrapper>
        {paramsMap.map((param) => (
          <SearchInput
            key={param}
            placeholder={`Search by ${param}`}
            value={queryParams.filterObject[param]}
            onChange={async (e) => {
              await setParamAndSendRequest(e, param);
            }}
          />
        ))}
      </StyledInputsWrapper>

      <MyButton disabled={filterObjectIsEmpty()} onClick={clearFieldsFunction}>
        Clear search inputs
      </MyButton>
    </StyledSearchPanel>
  );
};

SearchPanel.propTypes = {
  paramsMap: PropTypes.array,
  queryParams: PropTypes.object,
  fetchFunction: PropTypes.func,
  clearFieldsFunction: PropTypes.func,
};

export default SearchPanel;
