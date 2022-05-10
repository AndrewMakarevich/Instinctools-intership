import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UsersList from '../../components/users/usersList/usersList';
import useCombineFetching from '../../hooks/useCombineFetching';
import { getUsersThunk } from '../../store/reducers/userReducer/actionCreators';

const UsersPage = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  const getUsers = useCallback(async (filterObject, page, limit) => {
    await dispatch(getUsersThunk(filterObject, page, limit));
  }, []);

  const [fetchUsers, usersFetchLoading, usersDelayFetchLoading] =
    useCombineFetching(getUsers);

  const getUsersWithCurrentQueryParams = async (newQueryParamsObj, event) => {
    if (
      !event ||
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLSelectElement
    ) {
      await fetchUsers(
        false,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit,
      );
    } else {
      await fetchUsers(
        true,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit,
      );
    }
  };

  return (
    <article data-testid='users-list-wrapper'>
      <UsersList
        actionsArr={[]}
        getUsersFunction={getUsersWithCurrentQueryParams}
        usersArr={userReducer.users}
        usersCount={userReducer.count}
        usersLoading={usersFetchLoading || usersDelayFetchLoading}
        limit={5}
      />
    </article>
  );
};

export default UsersPage;
