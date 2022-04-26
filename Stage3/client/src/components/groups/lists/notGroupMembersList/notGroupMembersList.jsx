import { useCallback, useEffect, useState } from 'react';
import listStyles from './notGroupMembersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import { getNotGroupMembersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserSearchPanel from '../../../users/userList/userSearchPanel/userSearchPanel';

import NotGroupMembersItem from './notGroupMembersItem';

const NotGroupMembersList = ({ groupId, groupUsersIsOpen }) => {
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
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getUsers = useCallback(
    async (filterObject, page, limit) => {
      await dispatch(
        getNotGroupMembersThunk(groupId, filterObject, page, limit)
      );
    },
    [groupId]
  );

  const [fetchUsers, fetchUsersLoading, delayFetchUsersLoading] =
    useCombineFetching(getUsers);

  const getUsersWithCurrentQuryParams = (delayed, newQueryParamsObj) => {
    setUserQueryParams(newQueryParamsObj);
    fetchUsers(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  useEffect(() => {
    getUsersWithCurrentQuryParams(false, userQueryParams);
  }, [groupUsersIsOpen]);
  return (
    <>
      <UserSearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={userQueryParams}
        fetchUsers={getUsersWithCurrentQuryParams}
      />
      {userGroupReducer.notGroupMembers.length ? (
        <table
          className={`${listStyles['users-table']} ${
            fetchUsersLoading || delayFetchUsersLoading
              ? `${listStyles['loading']}`
              : ''
          }`}
        >
          <thead>
            <tr>
              <th>Username</th>
              <th>Full name</th>
              <th>Email</th>
              <th>Add to</th>
            </tr>
          </thead>
          <tbody>
            {userGroupReducer.notGroupMembers.map((user) => (
              <NotGroupMembersItem
                key={user._id}
                user={user}
                groupId={groupId}
                actualizeGroupUsersList={() => {
                  getUsersWithCurrentQuryParams(false, {
                    ...userQueryParams,
                    page: 1,
                  });
                }}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          Can't find user with such query params or group already have all
          members in
        </p>
      )}

      <PaginationLine
        page={userQueryParams.page}
        limit={userQueryParams.limit}
        count={userGroupReducer.count}
        setPage={(pageValue, delayed = false) => {
          const newQueryParamsObj = { ...userQueryParams, page: pageValue };
          getUsersWithCurrentQuryParams(delayed, newQueryParamsObj);
        }}
      />
    </>
  );
};

export default NotGroupMembersList;
