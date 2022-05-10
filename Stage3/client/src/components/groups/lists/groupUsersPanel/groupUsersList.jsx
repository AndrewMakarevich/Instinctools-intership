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
  limit = 10,
}) => {
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getGroupUsers = useCallback(
    async (filterObject, page, limitVal) => {
      await dispatch(thunkFunction(groupId, filterObject, page, limitVal));
    },
    [groupId, thunkFunction],
  );

  const [
    fetchGroupUsers,
    fetchGroupUsersLoading,
    delayedFetchGroupUsersLoading,
  ] = useCombineFetching(getGroupUsers);

  const getGroupUsersListWithCurrentQueryParams = useCallback(
    async (newQueryParamsObj, event) => {
      if (
        !event ||
        event.target instanceof HTMLButtonElement ||
        event.target instanceof HTMLSelectElement
      ) {
        await fetchGroupUsers(
          false,
          newQueryParamsObj.filterObject,
          newQueryParamsObj.page,
          newQueryParamsObj.limit,
        );
      } else {
        await fetchGroupUsers(
          true,
          newQueryParamsObj.filterObject,
          newQueryParamsObj.page,
          newQueryParamsObj.limit,
        );
      }
    },
    [fetchGroupUsers],
  );

  return (
    <UsersList
      actionsArr={actionsArr}
      getUsersFunction={getGroupUsersListWithCurrentQueryParams}
      usersArr={userGroupReducer[groupUsersStateArrName]}
      usersCount={userGroupReducer.count}
      usersLoading={fetchGroupUsersLoading || delayedFetchGroupUsersLoading}
      limit={limit}
    />
  );
};

GroupUsersList.propTypes = {
  groupId: PropTypes.string,
  groupUsersStateArrName: PropTypes.string,
  thunkFunction: PropTypes.func,
  actionsArr: PropTypes.array,
  limit: PropTypes.number,
};

export default GroupUsersList;
