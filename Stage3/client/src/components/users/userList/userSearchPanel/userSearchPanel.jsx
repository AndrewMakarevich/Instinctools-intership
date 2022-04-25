import PropTypes from 'prop-types';
import { useMemo } from 'react';
import MyButton from '../../../../UI/myButton/myButton';
import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './userSearchPanel.module.css';

const UserSearchPanel = ({ paramsMap, queryParams, fetchUsers }) => {
  const filterObjectIsEmpty = useMemo(
    () =>
      !Object.values(queryParams.filterObject).some((value) => value !== ''),
    [queryParams]
  );

  return (
    <section className={panelStyles['search-panel']}>
      <div className={panelStyles['search-panel__inputs']}>
        {paramsMap.map((param) => (
          <SearchInput
            key={param}
            placeholder={`Search by ${param}`}
            value={queryParams.filterObject[param]}
            onChange={async (e) => {
              const newQueryParamsObj = {
                ...queryParams,
                filterObject: {
                  ...queryParams.filterObject,
                  [param]: e.target.value,
                },
                page: 1,
              };
              await fetchUsers(true, newQueryParamsObj);
            }}
          />
        ))}
      </div>

      <MyButton
        disabled={filterObjectIsEmpty}
        onClick={async () => {
          if (filterObjectIsEmpty) {
            return;
          }

          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
            },
          };

          await fetchUsers(false, newQueryParamsObj);
        }}
      >
        Clear search inputs
      </MyButton>
    </section>
  );
};
UserSearchPanel.propTypes = {
  paramsMap: PropTypes.array,
  queryParams: PropTypes.object,
  setQueryParams: PropTypes.func,
  delayedFetchUsers: PropTypes.func,
};
UserSearchPanel.defaultProps = {
  paramsMap: [],
  queryParams: {},
  setQueryParams: () => {},
  delayedFetchUsers: () => {},
};
export default UserSearchPanel;
