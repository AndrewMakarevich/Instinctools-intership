import { useCallback, useEffect, useState } from 'react';
import listStyles from './groupsUserNotPartOfList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import { getGroupsUserNotParticipateInThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import GroupSearchPanel from '../../../groups/groupList/groupSearchPanel/groupSearchPanel';
import PaginationLine from '../../../paginationLine/paginationLine';
import GroupsUserNotPartOfItem from './groupsUserNotPartOfItem';

const GroupsUserNotPartOfList = ({ userId, userGroupsIsOpen }) => {
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

  const getGroups = useCallback(
    async (filterObject, page, limit) => {
      await dispatch(
        getGroupsUserNotParticipateInThunk(userId, filterObject, page, limit)
      );
    },
    [userId]
  );

  const [fetchGroups, fetchGroupsLoading, delayedFetchGroupsLoading] =
    useCombineFetching(getGroups);
  const getGroupsWithCurrentQueryParams = (delayed, newQueryParamsObj) => {
    setGroupQueryParams(newQueryParamsObj);
    fetchGroups(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  useEffect(() => {
    getGroupsWithCurrentQueryParams(false, groupQueryParams);
  }, [userGroupsIsOpen]);

  return (
    <>
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={groupQueryParams}
        fetchGroups={getGroupsWithCurrentQueryParams}
      />
      {userGroupReducer.groupsUserNotParticipateIn.length ? (
        <table
          className={`${listStyles['groups-table']} ${
            fetchGroupsLoading || delayedFetchGroupsLoading
              ? listStyles['loading']
              : ''
          }`}
        >
          <thead>
            <tr>
              <th>Group name</th>
              <th>Group title</th>
              <th>Enter group</th>
            </tr>
          </thead>
          <tbody>
            {userGroupReducer.groupsUserNotParticipateIn.map((group) => (
              <GroupsUserNotPartOfItem
                key={group._id}
                group={group}
                userId={userId}
                actualizeUserGroupsList={() =>
                  getGroupsWithCurrentQueryParams(false, {
                    ...groupQueryParams,
                    page: 1,
                  })
                }
              />
            ))}
          </tbody>
          <tfoot></tfoot>
        </table>
      ) : (
        <p>
          Can't find group with such query params or user already the member of
          all existing groups
        </p>
      )}

      <PaginationLine
        page={groupQueryParams.page}
        count={userGroupReducer.count}
        limit={groupQueryParams.limit}
        setPage={(pageValue, delayed = false) => {
          const newQueryParamObj = { ...groupQueryParams, page: pageValue };
          getGroupsWithCurrentQueryParams(delayed, newQueryParamObj);
        }}
      />
    </>
  );
};

export default GroupsUserNotPartOfList;
