import MyButton from '../../../../UI/myButton/myButton';
import SearchInput from '../../../../UI/searchInput/searchInput';
import panelStyles from './groupSearchPanel.module.css';

const GroupSearchPanel = ({ paramsMap, queryParams, fetchGroups }) => {
  return (
    <section className={panelStyles['search-panel']}>
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
              await fetchGroups(newQueryParamObj, true);
            }}
          />
        ))}
      </div>

      <MyButton
        onClick={async () => {
          const newQueryParamsObj = {
            ...queryParams,
            filterObject: {
              groupName: '',
              groupTitle: '',
            },
          };
          await fetchGroups(newQueryParamsObj, true);
        }}
      >
        Clear search inputs
      </MyButton>
    </section>
  );
};

export default GroupSearchPanel;
