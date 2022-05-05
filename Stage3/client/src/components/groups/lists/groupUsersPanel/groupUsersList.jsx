import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
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

  const getGroupUsersListWithCurrentQueryParams = useCallback(
    async (delayed, newQueryParamsObj) => {
      await fetchGroupUsers(
        delayed,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit
      );
    },
    [fetchGroupUsers]
  );

  return (
    <UsersList
      actionsArr={actionsArr}
      getUsersFunction={getGroupUsersListWithCurrentQueryParams}
      usersArr={userGroupReducer[groupUsersStateArrName]}
      usersCount={userGroupReducer.count}
      usersLoading={fetchGroupUsersLoading || delayedFetchGroupUsersLoading}
    />
  );
};

GroupUsersList.propTypes = {
  groupId: PropTypes.string,
  groupUsersStateArrName: PropTypes.string,
  thunkFunction: PropTypes.func,
  actionsArr: PropTypes.array,
};

export default GroupUsersList;
