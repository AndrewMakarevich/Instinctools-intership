import PropTypes from 'prop-types';
import SearchInput from '../../../../UI/searchInput/searchInput';
// import panelStyles from './userSearchPanel.module.css';

const UserSearchPanel = ({
  paramsMap,
  queryParams,
  setQueryParams,
  delayedFetchUsers,
}) => (
  <section>
    {paramsMap.map((param) => (
      <SearchInput
        key={param}
        placeholder={`Search by ${param}`}
        onChange={(e) => {
          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              ...queryParams.filterObject,
              [param]: e.target.value,
            },
          };
          setQueryParams(newQueryParamsObj);
          delayedFetchUsers(newQueryParamsObj);
        }}
        value={queryParams[param]}
      />
    ))}
  </section>
);

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
