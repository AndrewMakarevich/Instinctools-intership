import { useCallback, useEffect, useState } from 'react';
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
      <table>
        <thead>
          <th>Group name</th>
          <th>Group title</th>
          <th>Enter group</th>
        </thead>
        <tbody>
          {userGroupReducer.groupsUserNotParticipateIn.map((group) => (
            <GroupsUserNotPartOfItem group={group} />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
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
