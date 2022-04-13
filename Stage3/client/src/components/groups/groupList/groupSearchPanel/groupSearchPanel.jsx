import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './groupSearchPanel.module.css';

const GroupSearchPanel = ({
  paramsMap,
  queryParams,
  setQueryParams,
  delayFetchGroups,
}) => {
  return (
    <section className={panelStyles['search-panel']}>
      {paramsMap.map((param) => (
        <SearchInput
          key={param}
          placeholder={`Search by ${param}`}
          value={queryParams.filterObject[param]}
          onChange={(e) => {
            const newQueryParamObj = {
              ...queryParams,
              filterObject: {
                ...queryParams.filterObject,
                [param]: e.target.value,
              },
              page: 1,
            };
            delayFetchGroups(newQueryParamObj);
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
          delayFetchGroups(newQueryParamsObj);
        }}
      >
        Clear search inputs
      </button>
    </section>
  );
};

export default GroupSearchPanel;
