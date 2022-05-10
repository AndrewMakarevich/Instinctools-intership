import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import GroupsList from '../../../groups/groupsList/groupsList';

const UserGroupsList = ({
  userId,
  thunkFunction,
  userGroupsStateArrName,
  actionsArr,
  limit = 10,
}) => {
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getUserGroups = useCallback(
    async (filterObj, pageVal, limitVal) => {
      await dispatch(thunkFunction(userId, filterObj, pageVal, limitVal));
    },
    [userId],
  );

  const [
    fetchUserGroups,
    fetchUserGroupsLoading,
    delayedFetchUserGroupsLoading,
  ] = useCombineFetching(getUserGroups);

  const getUserGroupsWithCurrentQueryParams = useCallback(
    async (newQueryParamsObj, target) => {
      if (
        !target ||
        target instanceof HTMLButtonElement ||
        target instanceof HTMLSelectElement
      ) {
        await fetchUserGroups(
          false,
          newQueryParamsObj.filterObject,
          newQueryParamsObj.page,
          newQueryParamsObj.limit,
        );
      } else {
        await fetchUserGroups(
          true,
          newQueryParamsObj.filterObject,
          newQueryParamsObj.page,
          newQueryParamsObj.limit,
        );
      }
    },
    [fetchUserGroups],
  );

  return (
    <GroupsList
      actionsArr={actionsArr}
      groupsArr={userGroupReducer[userGroupsStateArrName]}
      groupsCount={userGroupReducer.count}
      getGroupsFunction={getUserGroupsWithCurrentQueryParams}
      groupsLoading={fetchUserGroupsLoading || delayedFetchUserGroupsLoading}
      limit={limit}
    />
  );
};

UserGroupsList.propTypes = {
  userId: PropTypes.string,
  thunkFunction: PropTypes.func,
  userGroupsStateArrName: PropTypes.string,
  actionsArr: PropTypes.array,
  limit: PropTypes.number,
};

export default UserGroupsList;
