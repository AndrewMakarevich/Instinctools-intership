import { useCallback, useEffect, useState } from 'react';
import PaginationLine from '../../paginationLine/paginationLine';
import SearchPanel from '../../searchPanel/searchPanel';
import GroupsItem from '../groupsItem/groupsItem';

import listStyles from './groupsList.module.css';

const GroupsList = ({
  userId = 0,
  groupsArr,
  groupsCount,
  getGroupsFunction,
  groupsLoading,
  actionsArr,
}) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 2,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });

  const getGroupsWithCurrentQueryParams = (delayed, newQueryParamsObj) => {
    setGroupQueryParams(newQueryParamsObj);
    getGroupsFunction(delayed, newQueryParamsObj);
  };

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...queryParams,
      filterObject: {
        groupName: '',
        groupTitle: '',
      },
    };
    await getGroupsWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [groupQueryParams, getGroupsWithCurrentQueryParams]);

  useEffect(() => {
    getGroupsWithCurrentQueryParams(false, groupQueryParams);
  }, []);

  return (
    <article className={listStyles['groups-table-wrapper']}>
      <SearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={groupQueryParams}
        fetchFunction={getGroupsWithCurrentQueryParams}
        clearFieldsFunction={clearQueryParams}
      />
      {groupsArr.length ? (
        <table
          data-testid='user-groups-table'
          className={`${listStyles['groups-table']} ${
            groupsLoading ? listStyles['loading'] : ''
          }`}
        >
          <thead>
            <tr>
              <th>Group name</th>
              <th>Group title</th>
              {actionsArr.map((action) => (
                <th key={action.header}>Action</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupsArr.map((group) => (
              <GroupsItem
                key={group._id}
                group={group}
                userId={userId}
                actualizeGroupsList={async (e) => {
                  await getGroupsWithCurrentQueryParams(false, {
                    ...groupQueryParams,
                    page: 1,
                  });
                }}
                actionsArr={actionsArr}
              />
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      ) : (
        <p>Can't find groups</p>
      )}
      <PaginationLine
        page={groupQueryParams.page}
        count={groupsCount}
        limit={groupQueryParams.limit}
        setPage={(pageValue, delayed = false) => {
          const newQueryParamObj = { ...groupQueryParams, page: pageValue };
          getGroupsWithCurrentQueryParams(delayed, newQueryParamObj);
        }}
      />
    </article>
  );
};

export default GroupsList;
