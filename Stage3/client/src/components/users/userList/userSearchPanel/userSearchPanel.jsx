import PropTypes from 'prop-types';
import MyButton from '../../../../UI/myButton/myButton';
import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './userSearchPanel.module.css';

const UserSearchPanel = ({ paramsMap, queryParams, fetchUsers }) => {
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
              await fetchUsers(newQueryParamsObj, true);
            }}
          />
        ))}
      </div>

      <MyButton
        onClick={async () => {
          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              username: '',
              firstName: '',
              lastName: '',
              email: '',
            },
          };
          await fetchUsers(newQueryParamsObj);
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
