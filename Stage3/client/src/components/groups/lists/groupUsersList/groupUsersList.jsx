import { useCallback, useEffect, useState } from 'react';
import listStyles from './groupUsersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getGroupUsersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserSearchPanel from '../../../users/userList/userSearchPanel/userSearchPanel';

const GroupUsersList = ({ groupId }) => {
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);
  const [groupUsersIsOpen, setGroupUsersIsOpen] = useState(false);
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

  const fetchGroupUsers = useCallback(
    async (filterObject, page, limit) => {
      await dispatch(getGroupUsersThunk(groupId, filterObject, page, limit));
    },
    [groupId]
  );

  const [getGroupUsersList, groupUsersLoading] = useDelayFetching(
    fetchGroupUsers,
    200
  );

  const getGroupUsersListWithCurrentQueryParams = (newQueryParamsObj) => {
    setUserQueryParams(newQueryParamsObj);
    getGroupUsersList(
      undefined,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  useEffect(() => {
    if (groupId) {
      fetchGroupUsers(undefined, userQueryParams.page, userQueryParams.limit);
    }
  }, [groupId]);
  return (
    <>
      <button onClick={() => setGroupUsersIsOpen(true)}>Users</button>
      <ModalWindow isOpen={groupUsersIsOpen} setIsOpen={setGroupUsersIsOpen}>
        <UserSearchPanel
          paramsMap={['username', 'firstName', 'lastName', 'email']}
          queryParams={userQueryParams}
          delayedFetchUsers={getGroupUsersListWithCurrentQueryParams}
        />
        {userGroupReducer.groupUsers.length ? (
          <div
            className={`${listStyles['users-list__wrapper']} ${
              groupUsersLoading ? `${listStyles['loading']}` : ''
            }`}
          >
            {userGroupReducer.groupUsers.map((user) => (
              <div key={user._id}>{user.username}</div>
            ))}
          </div>
        ) : (
          <p>Group has no members</p>
        )}

        <PaginationLine
          page={userQueryParams.page}
          limit={userQueryParams.limit}
          count={userGroupReducer.count}
          setPage={(pageValue) => {
            const newQueryParamsObj = { ...userQueryParams, page: pageValue };
            getGroupUsersListWithCurrentQueryParams(newQueryParamsObj);
          }}
        />
      </ModalWindow>
    </>
  );
};

export default GroupUsersList;
