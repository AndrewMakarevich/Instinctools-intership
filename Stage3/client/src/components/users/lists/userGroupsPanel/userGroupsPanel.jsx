import listStyles from './userGroupsPanel.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserGroupsPanelListItem from './userGroupsPanelListItem';
import SearchPanel from '../../../searchPanel/searchPanel';

const UserGroupsPanel = ({
  userId,
  userGroupsStateArrName,
  thunkFunction,
  actionsArr,
}) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 3,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });

  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getUserGroups = useCallback(
    async (filterObj, pageVal, limitVal) => {
      await dispatch(thunkFunction(userId, filterObj, pageVal, limitVal));
    },
    [userId]
  );

  const [
    fetchUserGroups,
    fetchUserGroupsLoading,
    delayedFetchUserGroupsLoading,
  ] = useCombineFetching(getUserGroups);

  const getUserGroupsWithCurrentQueryParams = async (
    delayed,
    newQueryParamsObj
  ) => {
    setGroupQueryParams(newQueryParamsObj);
    await fetchUserGroups(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...queryParams,
      filterObject: {
        groupName: '',
        groupTitle: '',
      },
    };
    await getUserGroupsWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [groupQueryParams, getUserGroupsWithCurrentQueryParams]);

  useEffect(() => {
    getUserGroupsWithCurrentQueryParams(false, groupQueryParams);
  }, []);

  return (
    <>
      <SearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={groupQueryParams}
        fetchFunction={getUserGroupsWithCurrentQueryParams}
        clearFieldsFunction={clearQueryParams}
      />
      {userGroupReducer[userGroupsStateArrName].length ? (
        <table
          className={`${listStyles['groups-table']} ${
            fetchUserGroupsLoading || delayedFetchUserGroupsLoading
              ? listStyles['loading']
              : ''
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
            {userGroupReducer[userGroupsStateArrName].map((group) => (
              <UserGroupsPanelListItem
                key={group._id}
                group={group}
                userId={userId}
                actualizeUserGroupsList={async (e) => {
                  await getUserGroupsWithCurrentQueryParams(false, {
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
        count={userGroupReducer.count}
        limit={groupQueryParams.limit}
        setPage={(pageValue, delayed = false) => {
          const newQueryParamObj = { ...groupQueryParams, page: pageValue };
          getUserGroupsWithCurrentQueryParams(delayed, newQueryParamObj);
        }}
      />
    </>
  );
};

export default UserGroupsPanel;
