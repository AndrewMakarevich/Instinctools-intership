import MyButton from '../../../../UI/myButton/myButton';
import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './groupSearchPanel.module.css';

const GroupSearchPanel = ({ paramsMap, queryParams, fetchGroups }) => {
  const filterObjectIsEmpty = !Object.values(queryParams.filterObject).some(
    (value) => value !== ''
  );
  return (
    <section data-testid='search-panel' className={panelStyles['search-panel']}>
      <div className={panelStyles['search-panel__inputs']}>
        {paramsMap.map((param) => (
          <SearchInput
            key={param}
            placeholder={`Search by ${param}`}
            value={queryParams.filterObject[param]}
            onChange={async (e) => {
              const newQueryParamObj = {
                ...queryParams,
                filterObject: {
                  ...queryParams.filterObject,
                  [param]: e.target.value,
                },
                page: 1,
              };
              await fetchGroups(true, newQueryParamObj);
            }}
          />
        ))}
      </div>

      <MyButton
        data-testid='clear-group-search-panel-btn'
        disabled={filterObjectIsEmpty}
        onClick={async () => {
          if (filterObjectIsEmpty) {
            return;
          }

          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              groupName: '',
              groupTitle: '',
            },
          };
          await fetchGroups(false, newQueryParamsObj);
        }}
      >
        Clear search inputs
      </MyButton>
    </section>
  );
};

export default GroupSearchPanel;
