import PropTypes from 'prop-types';
import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './userSearchPanel.module.css';

const UserSearchPanel = ({ paramsMap, queryParams, delayedFetchUsers }) => {
  return (
    <section className={panelStyles['search-panel']}>
      {paramsMap.map((param) => (
        <SearchInput
          key={param}
          placeholder={`Search by ${param}`}
          value={queryParams.filterObject[param]}
          onChange={(e) => {
            const newQueryParamsObj = {
              ...queryParams,
              filterObject: {
                ...queryParams.filterObject,
                [param]: e.target.value,
              },
              page: 1,
            };
            delayedFetchUsers(newQueryParamsObj);
          }}
        />
      ))}
      <button
        onClick={() => {
          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
            },
          };
          delayedFetchUsers(newQueryParamsObj);
        }}
      >
        Clear search inputs
      </button>
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
