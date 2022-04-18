import { useCallback, useEffect, useState } from 'react';
import listStyles from './groupUsersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getGroupUsersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserSearchPanel from '../../../users/userList/userSearchPanel/userSearchPanel';
import { userPaths } from '../../../router/routes';
import { Link, useNavigate } from 'react-router-dom';
import MyButton from '../../../../UI/myButton/myButton';
import UserGroupService from '../../../../service/userGroupService';
import useFetching from '../../../../hooks/useFetching';

const GroupUsersList = ({ groupId }) => {
  const navigate = useNavigate();
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

  const getGroupUsers = useCallback(
    async (filterObject, page, limit) => {
      await dispatch(getGroupUsersThunk(groupId, filterObject, page, limit));
    },
    [groupId]
  );

  const {
    executeCallback: fetchGroupUsers,
    isLoading: fetchGroupUsersLoading,
  } = useFetching(getGroupUsers);
  const [delayedFetchGroupUsers, delayedFetchGroupUsersLoading] =
    useDelayFetching(getGroupUsers, 200);

  const getGroupUsersListWithCurrentQueryParams = async (
    newQueryParamsObj,
    delayed
  ) => {
    setUserQueryParams(newQueryParamsObj);

    if (delayed) {
      await delayedFetchGroupUsers(
        undefined,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit
      );
      return;
    }

    await fetchGroupUsers(
      undefined,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  useEffect(() => {
    if (groupUsersIsOpen) {
      getGroupUsersListWithCurrentQueryParams(userQueryParams, false);
    }
  }, [groupUsersIsOpen]);

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
      <ModalWindow
        isOpen={groupUsersIsOpen}
        setIsOpen={setGroupUsersIsOpen}
        modalContentClassName={listStyles['group-users-content__wrapper']}
      >
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
            {userGroupReducer.groupUsers.map((user) => (
              <tr
                key={user._id}
                className={listStyles['user-row']}
                onClick={() =>
                  navigate(`${userPaths.mainPath}/${user.username}`)
                }
              >
                <td>{user.username}</td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>
                  <MyButton
                    className={listStyles['delete-group-user-btn']}
                    disabled={deleteUserFromGroupIsLoading}
                    onClick={async (e) => {
                      e.stopPropagation();

                      if (
                        confirm(
                          'Are you sure you want to delete user fron this group?'
                        )
                      ) {
                        await sendRequestToDeleteUserFromGroup(
                          undefined,
                          user._id
                        );
                        getGroupUsersListWithCurrentQueryParams(
                          { ...userQueryParams, page: 1 },
                          false
                        );
                      }
                    }}
                  >
                    Delete user from the group
                  </MyButton>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <p>Group has no members</p>
        )}

        <PaginationLine
          page={userQueryParams.page}
          limit={userQueryParams.limit}
          count={userGroupReducer.count}
          setPage={(pageValue, delayed = false) => {
            const newQueryParamsObj = { ...userQueryParams, page: pageValue };
            getGroupUsersListWithCurrentQueryParams(newQueryParamsObj, delayed);
          }}
        />
      </ModalWindow>
    </>
  );
};

export default GroupUsersList;
