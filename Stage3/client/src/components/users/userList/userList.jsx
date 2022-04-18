import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDelayFetching from '../../../hooks/useDelayFetching';
import useFetching from '../../../hooks/useFetching';
import { getUsersThunk } from '../../../store/reducers/userReducer/actionCreators';
import AddButton from '../../../UI/addButton/addButton';
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

  const { executeCallback: fetchUsers, isLoading: usersFetchLoading } =
    useFetching(getUsers);

  const [delayedFetchUsers, usersDelayFetchLoading] = useDelayFetching(
    getUsers,
    400
  );

  async function getUsersListWithCurrentQueryParams(
    newQueryParamsObj,
    delayed
  ) {
    setQueryParams(newQueryParamsObj);

    if (delayed) {
      await delayedFetchUsers(
        null,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit
      );
      return;
    }

    await fetchUsers(
      null,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  }

  useEffect(() => {
    getUsersListWithCurrentQueryParams(queryParams, false);
  }, []);

  return (
    <article className={listStyles['users-table-wrapper']}>
      <UserSearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        fetchUsers={getUsersListWithCurrentQueryParams}
      />
      {/* <AddButton /> */}
      <table
        className={`${listStyles['users-table']} ${
          usersDelayFetchLoading || usersFetchLoading ? listStyles.loading : ''
        }`}
      >
        <tr>
          <th>Username</th>
          <th>Full name</th>
          <th>Email</th>
        </tr>
        {userReducer.users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </table>
      <PaginationLine
        count={userReducer.count}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={async (page) => {
          const newQueryParamsObj = { ...queryParams, page };
          await getUsersListWithCurrentQueryParams(newQueryParamsObj, false);
        }}
      />
    </article>
  );
};

export default UserList;
