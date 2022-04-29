import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import GroupsList from '../../../groups/groupsList/groupsList';

const UserGroupsList = ({
  userId,
  thunkFunction,
  userGroupsStateArrName,
  actionsArr,
}) => {
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
    await fetchUserGroups(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  return (
    <GroupsList
      actionsArr={actionsArr}
      groupsArr={userGroupReducer[userGroupsStateArrName]}
      groupsCount={userGroupReducer.count}
      getGroupsFunction={getUserGroupsWithCurrentQueryParams}
      groupsLoading={fetchUserGroupsLoading || delayedFetchUserGroupsLoading}
      userId={userId}
    />
  );
};

export default UserGroupsList;
