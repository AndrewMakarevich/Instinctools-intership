import { useCallback, useEffect, useState } from 'react';
import listStyles from './userGroupList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getUserGroupsThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import GroupSearchPanel from '../../../groups/groupList/groupSearchPanel/groupSearchPanel';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import { groupPaths } from '../../../router/routes';
import MyButton from '../../../../UI/myButton/myButton';
import UserGroupService from '../../../../service/userGroupService';
import useFetching from '../../../../hooks/useFetching';

const UserGroupList = ({ userId }) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 1,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });
  const [userGroupsIsOpen, setUserGroupsIsOpen] = useState(false);

  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const fetchUserGroups = useCallback(
    async (filterObj, pageVal, limitVal) => {
      await dispatch(getUserGroupsThunk(userId, filterObj, pageVal, limitVal));
    },
    [userId]
  );

  const [getUserGroupsList, userGroupsLoading] = useDelayFetching(
    fetchUserGroups,
    400
  );

  const getUserGroupsWithCurrentQueryParams = (newQueryParamObj) => {
    setGroupQueryParams(newQueryParamObj);
    // getUserGroupsList(
    //   undefined,
    //   newQueryParamObj.filterObject,
    //   newQueryParamObj.page,
    //   newQueryParamObj.limit
    // );
  };

  useEffect(() => {
    if (userId) {
      fetchUserGroups(undefined, groupQueryParams.page, groupQueryParams.limit);
    }
  }, [userId]);

  //Deleting user from the group
  const deleteUserFromGroup = useCallback(
    async (groupId) => {
      await UserGroupService.deleteUserFromTheGroup(userId, groupId);
    },
    [userId]
  );

  const {
    executeCallback: sendRequestToDeleteUserFromGroup,
    isLoading: deleteUserFromGroupIsLoading,
  } = useFetching(async (groupId) => await deleteUserFromGroup(groupId));

  return (
    <>
      <MyButton onClick={() => setUserGroupsIsOpen(true)}>User groups</MyButton>
      <ModalWindow isOpen={userGroupsIsOpen} setIsOpen={setUserGroupsIsOpen}>
        <GroupSearchPanel
          paramsMap={['groupName', 'groupTitle']}
          queryParams={groupQueryParams}
          setQueryParams={setGroupQueryParams}
          delayFetchGroups={getUserGroupsWithCurrentQueryParams}
        />
        {userGroupReducer.userGroups.length ? (
          <ul
            className={`${listStyles['groups-list']} ${
              userGroupsLoading ? listStyles['loading'] : ''
            }`}
          >
            {userGroupReducer.userGroups.map((group) => (
              <li className={listStyles['groups-list__item']} key={group._id}>
                <Link
                  className={listStyles['group-link']}
                  to={`${groupPaths.mainPath}/${group.groupName}`}
                >
                  {group.groupName}
                </Link>
                <MyButton
                  className={listStyles['delete-user-group-btn']}
                  disabled={deleteUserFromGroupIsLoading}
                  onClick={async () => {
                    if (confirm('Are you sure you want to leave this group?')) {
                      await sendRequestToDeleteUserFromGroup(
                        undefined,
                        group._id
                      );
                    }
                    await getUserGroupsList(
                      undefined,
                      groupQueryParams.filterObject,
                      groupQueryParams.page,
                      groupQueryParams.limit
                    );
                  }}
                >
                  Leave this group
                </MyButton>
              </li>
            ))}
          </ul>
        ) : (
          <p>User isn't a member of any group</p>
        )}
        <PaginationLine
          page={groupQueryParams.page}
          count={userGroupReducer.count}
          limit={groupQueryParams.limit}
          setPage={(pageValue) => {
            const newQueryParamObj = { ...groupQueryParams, page: pageValue };
            getUserGroupsWithCurrentQueryParams(newQueryParamObj);
          }}
        />
      </ModalWindow>
    </>
  );
};

export default UserGroupList;
