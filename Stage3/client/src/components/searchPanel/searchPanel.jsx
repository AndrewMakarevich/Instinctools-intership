import React from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../UI/myButton/myButton';
import SearchInput from '../../UI/searchInput/searchInput';

import panelStyles from './searchPanel.module.css';

const SearchPanel = ({
  paramsMap,
  queryParams,
  fetchFunction,
  clearFieldsFunction,
}) => {
  const filterObjectIsEmpty = () => !Object.values(queryParams.filterObject).some((value) => value !== '');

  const setParamAndSendRequest = async (e, param) => {
    const newQueryParamsObj = {
      ...queryParams,
      filterObject: {
        ...queryParams.filterObject,
        [param]: e.target.value,
      },
      page: 1,
    };
    await fetchFunction(true, newQueryParamsObj);
  };

  return (
    <section data-testid='search-panel' className={panelStyles['search-panel']}>
      <div className={panelStyles['search-panel__inputs']}>
        {paramsMap.map((param) => (
          <SearchInput
            key={param}
            placeholder={`Search by ${param}`}
            value={queryParams.filterObject[param]}
            onChange={async (e) => { await setParamAndSendRequest(e, param); }}
          />
        ))}
      </div>

      <MyButton disabled={filterObjectIsEmpty()} onClick={clearFieldsFunction}>
        Clear search inputs
      </MyButton>
    </section>
  );
};

SearchPanel.propTypes = {
  paramsMap: PropTypes.array,
  queryParams: PropTypes.object,
  fetchFunction: PropTypes.func,
  clearFieldsFunction: PropTypes.func,
};

export default SearchPanel;
