import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useDelayFetching from '../../../hooks/useDelayFetching';
import getUsers from '../../../store/reducers/userReducer/actionCreators';
import AddButton from '../../../UI/addButton/addButton';
import PaginationLine from '../../paginationLine/paginationLine';
import UserItem from '../userItem/userItem';
import listStyles from './userList.module.css';
import UserSearchPanel from './userSearchPanel/userSearchPanel';

const UserList = () => {
  const [queryParams, setQueryParams] = useState({
    filterObject: {},
    page: 1,
    limit: 1,
  });
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);

  const fetchUsers = useCallback(async (queryParamsObj) => {
    await dispatch(getUsers(queryParamsObj));
    setQueryParams({ ...queryParams, page: 1 });
  });

  const [delayedFetchUsers, usersLoading] = useDelayFetching(fetchUsers, 400);

  useEffect(() => {
    fetchUsers(queryParams);
  }, []);

  return (
    <article className={listStyles['user-list-wrapper']}>
      <UserSearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        delayedFetchUsers={delayedFetchUsers}
      />
      <AddButton />
      <ul
        className={`${listStyles['user-list']} ${
          usersLoading ? listStyles.loading : 'lol'
        }`}
      >
        {userReducer.users.map((user) => (
          <UserItem key={user._id} user={user} />
        ))}
      </ul>
      <PaginationLine
        count={userReducer.count}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={(page) => {
          const newQueryParamsObj = { ...queryParams, page };
          setQueryParams(newQueryParamsObj);
          delayedFetchUsers(undefined, newQueryParamsObj);
        }}
        delayedFetchUsers={delayedFetchUsers}
      />
    </article>
  );
};

export default UserList;
