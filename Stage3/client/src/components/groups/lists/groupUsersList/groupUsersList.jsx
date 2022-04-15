import { useCallback, useEffect, useState } from 'react';
import listStyles from './groupUsersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getGroupUsersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserSearchPanel from '../../../users/userList/userSearchPanel/userSearchPanel';
import { userPaths } from '../../../router/routes';
import { Link } from 'react-router-dom';
import MyButton from '../../../../UI/myButton/myButton';
import UserGroupService from '../../../../service/userGroupService';
import useFetching from '../../../../hooks/useFetching';

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

  //Deleting user from the group
  const deleteUserFromGroup = useCallback(
    async (userId) => {
      await UserGroupService.deleteUserFromTheGroup(userId, groupId);
    },
    [groupId]
  );

  const {
    executeCallback: sendRequestToDeleteUserFromGroup,
    isLoading: deleteUserFromGroupIsLoading,
  } = useFetching(async (userId) => await deleteUserFromGroup(userId));

  return (
    <>
      <MyButton onClick={() => setGroupUsersIsOpen(true)}>Users</MyButton>
      <ModalWindow isOpen={groupUsersIsOpen} setIsOpen={setGroupUsersIsOpen}>
        <UserSearchPanel
          paramsMap={['username', 'firstName', 'lastName', 'email']}
          queryParams={userQueryParams}
          delayedFetchUsers={getGroupUsersListWithCurrentQueryParams}
        />
        {userGroupReducer.groupUsers.length ? (
          <ul
            className={`${listStyles['users-list']} ${
              groupUsersLoading ? `${listStyles['loading']}` : ''
            }`}
          >
            {userGroupReducer.groupUsers.map((user) => (
              <li key={user._id} className={listStyles['users-list__item']}>
                <Link
                  className={listStyles['user-link']}
                  to={`${userPaths.mainPath}/${user.username}`}
                >
                  {user.username}
                </Link>
                <MyButton
                  className={listStyles['delete-group-user-btn']}
                  disabled={deleteUserFromGroupIsLoading}
                  onClick={async () => {
                    if (
                      confirm(
                        'Are you sure you want to delete user fron this group?'
                      )
                    ) {
                      await sendRequestToDeleteUserFromGroup(
                        undefined,
                        user._id
                      );
                      getGroupUsersList(
                        undefined,
                        userQueryParams.filterObject,
                        userQueryParams.page,
                        userQueryParams.limit
                      );
                    }
                  }}
                >
                  Delete user from the group
                </MyButton>
              </li>
            ))}
          </ul>
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
