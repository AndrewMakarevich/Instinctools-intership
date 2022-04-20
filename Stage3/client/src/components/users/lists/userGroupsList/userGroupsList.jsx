import { useCallback, useEffect, useState } from 'react';
import listStyles from './userGroupList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getUserGroupsThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import GroupSearchPanel from '../../../groups/groupList/groupSearchPanel/groupSearchPanel';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import { groupPaths } from '../../../router/routes';
import MyButton from '../../../../UI/myButton/myButton';
import UserGroupService from '../../../../service/userGroupService';
import useFetching from '../../../../hooks/useFetching';

const UserGroupsList = ({ userId }) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 3,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });
  const [userGroupsIsOpen, setUserGroupsIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getUserGroups = useCallback(
    async (filterObj, pageVal, limitVal) => {
      await dispatch(getUserGroupsThunk(userId, filterObj, pageVal, limitVal));
    },
    [userId]
  );

  const {
    executeCallback: fetchUserGroups,
    isLoading: fetchUserGroupsLoading,
  } = useFetching(getUserGroups);
  const [delayedFetchUserGroups, delayedFetchUserGroupsLoading] =
    useDelayFetching(getUserGroups, 400);

  const getUserGroupsWithCurrentQueryParams = async (
    newQueryParamObj,
    delayed
  ) => {
    setGroupQueryParams(newQueryParamObj);

    if (delayed) {
      await delayedFetchUserGroups(
        undefined,
        newQueryParamObj.filterObject,
        newQueryParamObj.page,
        newQueryParamObj.limit
      );
      return;
    }

    await fetchUserGroups(
      undefined,
      newQueryParamObj.filterObject,
      newQueryParamObj.page,
      newQueryParamObj.limit
    );
  };

  useEffect(() => {
    if (userGroupsIsOpen) {
      fetchUserGroups(
        undefined,
        groupQueryParams.filterObject,
        groupQueryParams.page,
        groupQueryParams.limit
      );
    }
  }, [userGroupsIsOpen]);

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
      <ModalWindow
        isOpen={userGroupsIsOpen}
        setIsOpen={setUserGroupsIsOpen}
        modalContentClassName={listStyles['user-groups-content__wrapper']}
      >
        <GroupSearchPanel
          paramsMap={['groupName', 'groupTitle']}
          queryParams={groupQueryParams}
          fetchGroups={getUserGroupsWithCurrentQueryParams}
        />
        {userGroupReducer.userGroups.length ? (
          <table
            className={`${listStyles['groups-table']} ${
              delayedFetchUserGroupsLoading ? listStyles['loading'] : ''
            }`}
          >
            <thead>
              <tr>
                <th>Group name</th>
                <th>Group title</th>
                <th>Leave group</th>
              </tr>
            </thead>
            <tbody>
              {userGroupReducer.userGroups.map((group) => (
                <tr
                  key={group._id}
                  className={listStyles['group-row']}
                  onClick={() =>
                    navigate(`${groupPaths.mainPath}/${group.groupName}`)
                  }
                >
                  <td className={listStyles['group-cell']}>
                    {group.groupName}
                  </td>
                  <td className={listStyles['group-cell']}>
                    {group.groupTitle}
                  </td>
                  <td className={listStyles['group-cell']}>
                    <MyButton
                      className={listStyles['delete-user-group-btn']}
                      disabled={deleteUserFromGroupIsLoading}
                      onClick={async (e) => {
                        e.stopPropagation();

                        if (
                          confirm('Are you sure you want to leave this group?')
                        ) {
                          await sendRequestToDeleteUserFromGroup(
                            undefined,
                            group._id
                          );
                        }

                        await getUserGroupsWithCurrentQueryParams(
                          { ...groupQueryParams, page: 1 },
                          false
                        );
                      }}
                    >
                      Leave this group
                    </MyButton>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        ) : (
          <p>User isn't a member of any group</p>
        )}
        <PaginationLine
          page={groupQueryParams.page}
          count={userGroupReducer.count}
          limit={groupQueryParams.limit}
          setPage={(pageValue, delayed = false) => {
            const newQueryParamObj = { ...groupQueryParams, page: pageValue };
            getUserGroupsWithCurrentQueryParams(newQueryParamObj, delayed);
          }}
        />
      </ModalWindow>
    </>
  );
};

export default UserGroupsList;
