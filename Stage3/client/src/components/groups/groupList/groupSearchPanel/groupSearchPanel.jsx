import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './groupSearchPanel.module.css';

const GroupSearchPanel = ({
  paramsMap,
  queryParams,
  setQueryParams,
  delayFetchGroups,
}) => {
  function getGroupsListWithCurrentQueryParams(param, value) {
    const newQueryParamsObj = {
      ...queryParams,
      filterObject: {
        ...queryParams.filterObject,
        [param]: value,
      },
      page: 1,
    };
    delayFetchGroups(undefined, newQueryParamsObj);
    setQueryParams(newQueryParamsObj);
  }

  return (
    <section className={panelStyles['search-panel']}>
      {paramsMap.map((param) => (
        <SearchInput
          key={param}
          placeholder={`Search by ${param}`}
          value={queryParams.filterObject[param]}
          onChange={(e) => {
            getGroupsListWithCurrentQueryParams(param, e.target.value);
          }}
        />
      ))}
      <button
        onClick={() => {
          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              groupName: '',
              groupTitle: '',
            },
          };
          setQueryParams(newQueryParamsObj);
          delayFetchGroups(undefined, newQueryParamsObj);
        }}
      >
        Clear search inputs
      </button>
    </section>
  );
};

export default GroupSearchPanel;
