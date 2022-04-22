import { useCallback, useEffect, useState } from 'react';
import listStyles from './groupUsersList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getGroupUsersThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import UserSearchPanel from '../../../users/userList/userSearchPanel/userSearchPanel';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../../UI/myButton/myButton';
import useFetching from '../../../../hooks/useFetching';
import GroupUsersItem from './groupUsersItem';

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

  return (
    <article data-testid='group-users-list-wrapper'>
      <MyButton
        data-testid='open-group-users-modal-btn'
        onClick={() => setGroupUsersIsOpen(true)}
      >
        Users
      </MyButton>
      <ModalWindow
        testId='group-users-modal'
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
                    getGroupUsersListWithCurrentQueryParams(
                      { ...userQueryParams, page: 1 },
                      false
                    );
                  }}
                />
              ))}
            </tbody>
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
    </article>
  );
};

export default GroupUsersList;
