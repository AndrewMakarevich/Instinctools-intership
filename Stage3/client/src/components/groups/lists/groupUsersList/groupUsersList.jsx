import { useCallback, useEffect, useState } from 'react';
import listStyles from './groupUsersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGroupUsersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserSearchPanel from '../../../users/userList/userSearchPanel/userSearchPanel';
import GroupUsersItem from './groupUsersItem';
import useCombineFetching from '../../../../hooks/useCombineFetching';

const GroupUsersList = ({ groupId, groupUsersIsOpen }) => {
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);
  const [userQueryParams, setUserQueryParams] = useState({
    filterObject: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    },
    page: 1,
    limit: 2,
  });

  const getGroupUsers = useCallback(
    async (filterObject, page, limit) => {
      await dispatch(getGroupUsersThunk(groupId, filterObject, page, limit));
    },
    [groupId]
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
    setUserQueryParams(newQueryParamsObj);
    await fetchGroupUsers(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  useEffect(() => {
    if (groupUsersIsOpen) {
      getGroupUsersListWithCurrentQueryParams(false, userQueryParams);
    }
  }, [groupUsersIsOpen]);

  return (
    <>
      <UserSearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={userQueryParams}
        fetchUsers={getGroupUsersListWithCurrentQueryParams}
      />
      {userGroupReducer.groupUsers.length ? (
        <table
          className={`${listStyles['users-table']} ${
            delayedFetchGroupUsersLoading || fetchGroupUsersLoading
              ? `${listStyles['loading']}`
              : ''
          }`}
        >
          <thead>
            <tr>
              <th>Username</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Delete from</th>
            </tr>
          </thead>
          <tbody>
            {userGroupReducer.groupUsers.map((user) => (
              <GroupUsersItem
                key={user._id}
                user={user}
                groupId={groupId}
                actualizeGroupUsersList={() => {
                  getGroupUsersListWithCurrentQueryParams(false, {
                    ...userQueryParams,
                    page: 1,
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Can't find user with such query params or group has no members</p>
      )}

      <PaginationLine
        page={userQueryParams.page}
        limit={userQueryParams.limit}
        count={userGroupReducer.count}
        setPage={(pageValue, delayed = false) => {
          const newQueryParamsObj = { ...userQueryParams, page: pageValue };
          getGroupUsersListWithCurrentQueryParams(delayed, newQueryParamsObj);
        }}
      />
    </>
  );
};

export default GroupUsersList;
