import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../hooks/useCombineFetching';
import { getUsersThunk } from '../../../store/reducers/userReducer/actionCreators';
import PaginationLine from '../../paginationLine/paginationLine';
import UserItem from '../userItem/userItem';
import listStyles from './userList.module.css';
import UserSearchPanel from './userSearchPanel/userSearchPanel';

const UserList = () => {
  const [queryParams, setQueryParams] = useState({
    filterObject: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    },
    page: 1,
    limit: 5,
  });
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  const getUsers = useCallback(async (filterObject, page, limit) => {
    await dispatch(getUsersThunk(filterObject, page, limit));
  }, []);

  const [fetchUsers, usersFetchLoading, usersDelayFetchLoading] =
    useCombineFetching(getUsers);

  async function getUsersListWithCurrentQueryParams(
    delayed,
    newQueryParamsObj
  ) {
    setQueryParams(newQueryParamsObj);
    await fetchUsers(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  }

  useEffect(() => {
    getUsersListWithCurrentQueryParams(false, queryParams);
  }, []);

  return (
    <article
      data-testid='users-table-wrapper'
      className={listStyles['users-table-wrapper']}
    >
      <UserSearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        fetchUsers={getUsersListWithCurrentQueryParams}
      />
      {/* <AddButton /> */}
      <table
        data-testid='users-table'
        className={`${listStyles['users-table']} ${
          usersDelayFetchLoading || usersFetchLoading ? listStyles.loading : ''
        }`}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Full name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {userReducer.users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <PaginationLine
        count={userReducer.count}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={async (page, delayed = false) => {
          const newQueryParamsObj = { ...queryParams, page };
          await getUsersListWithCurrentQueryParams(delayed, newQueryParamsObj);
        }}
      />
    </article>
  );
};

export default UserList;
