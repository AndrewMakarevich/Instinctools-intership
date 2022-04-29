import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import UsersList from '../../../users/usersList/usersList';

const GroupUsersList = ({
  groupId,
  groupUsersStateArrName,
  thunkFunction,
  actionsArr,
}) => {
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getGroupUsers = useCallback(
    async (filterObject, page, limit) => {
      await dispatch(thunkFunction(groupId, filterObject, page, limit));
    },
    [groupId, thunkFunction]
  );

  const [
    fetchGroupUsers,
    fetchGroupUsersLoading,
    delayedFetchGroupUsersLoading,
  ] = useCombineFetching(getGroupUsers);

  const getGroupUsersListWithCurrentQueryParams = async (
    delayed,
    newQueryParamsObj
  ) => {
    await fetchGroupUsers(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  return (
    <UsersList
      actionsArr={actionsArr}
      getUsersFunction={getGroupUsersListWithCurrentQueryParams}
      usersArr={userGroupReducer[groupUsersStateArrName]}
      usersCount={userGroupReducer.count}
      usersLoading={fetchGroupUsersLoading || delayedFetchGroupUsersLoading}
      groupId={groupId}
    />
  );
};

export default GroupUsersList;
