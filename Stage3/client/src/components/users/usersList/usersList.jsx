import { useCallback, useEffect, useState } from 'react';
import PaginationLine from '../../paginationLine/paginationLine';
import SearchPanel from '../../searchPanel/searchPanel';
import UsersItem from '../usersItem/usersItem';
import listStyles from './usersList.module.css';

const UsersList = ({
  usersArr,
  usersCount,
  getUsersFunction,
  usersLoading,
  groupId = 0,
  actionsArr,
}) => {
  const [queryParams, setQueryParams] = useState({
    filterObject: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    },
    page: 1,
    limit: 10,
  });

  async function getUsersListWithCurrentQueryParams(
    delayed,
    newQueryParamsObj
  ) {
    setQueryParams(newQueryParamsObj);
    await getUsersFunction(delayed, newQueryParamsObj);
  }

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...queryParams,
      filterObject: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
      },
    };
    await getUsersListWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [queryParams, getUsersListWithCurrentQueryParams]);

  const setPage = async (page, delayed = false) => {
    const newQueryParamsObj = { ...queryParams, page };
    await getUsersListWithCurrentQueryParams(delayed, newQueryParamsObj);
  };

  useEffect(() => {
    getUsersListWithCurrentQueryParams(false, queryParams);
  }, []);

  return (
    <article
      data-testid='users-table-wrapper'
      className={listStyles['users-table-wrapper']}
    >
      <SearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        fetchFunction={getUsersListWithCurrentQueryParams}
        clearFieldsFunction={clearQueryParams}
      />
      <table
        data-testid='users-table'
        className={`${listStyles['users-table']} ${
          usersLoading ? listStyles.loading : ''
        }`}
      >
        <thead>
          <tr>
            <th>Username</th>
            <th>Full name</th>
            <th>Email</th>
            {actionsArr.map((action) => (
              <th key={action.header}>Action</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {usersArr.map((user) => (
            <UsersItem
              key={user._id}
              user={user}
              groupId={groupId}
              actionsArr={actionsArr}
              actualizeGroupUsersList={() =>
                getUsersListWithCurrentQueryParams(false, {
                  ...queryParams,
                  page: 1,
                })
              }
            />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <PaginationLine
        count={usersCount}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={setPage}
      />
    </article>
  );
};

export default UsersList;
