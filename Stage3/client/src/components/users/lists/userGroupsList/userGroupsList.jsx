import { useCallback, useEffect, useState } from 'react';
import listStyles from './userGroupList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserGroupsThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import GroupSearchPanel from '../../../groups/groupList/groupSearchPanel/groupSearchPanel';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';
import MyButton from '../../../../UI/myButton/myButton';
import UserGroupsItem from './userGroupsItem';
import useCombineFetching from '../../../../hooks/useCombineFetching';

const UserGroupsList = ({ userId, userGroupsIsOpen }) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 3,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });

  const dispatch = useDispatch();
  const userGroupReducer = useSelector((store) => store.userGroupReducer);

  const getUserGroups = useCallback(
    async (filterObj, pageVal, limitVal) => {
      await dispatch(getUserGroupsThunk(userId, filterObj, pageVal, limitVal));
    },
    [userId]
  );

  const [
    fetchUserGroups,
    fetchUserGroupsLoading,
    delayedFetchUserGroupsLoading,
  ] = useCombineFetching(getUserGroups);

  const getUserGroupsWithCurrentQueryParams = async (
    delayed,
    newQueryParamsObj
  ) => {
    setGroupQueryParams(newQueryParamsObj);
    await fetchUserGroups(
      delayed,
      newQueryParamsObj.filterObject,
      newQueryParamsObj.page,
      newQueryParamsObj.limit
    );
  };

  useEffect(() => {
    if (userGroupsIsOpen) {
      getUserGroupsWithCurrentQueryParams(false, groupQueryParams);
    }
  }, [userGroupsIsOpen]);

  return (
    <>
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={groupQueryParams}
        fetchGroups={getUserGroupsWithCurrentQueryParams}
      />
      {userGroupReducer.userGroups.length ? (
        <table
          className={`${listStyles['groups-table']} ${
            fetchUserGroupsLoading || delayedFetchUserGroupsLoading
              ? listStyles['loading']
              : ''
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
              <UserGroupsItem
                key={group._id}
                group={group}
                userId={userId}
                actualizeUserGroupsList={async (e) => {
                  await getUserGroupsWithCurrentQueryParams(false, {
                    ...groupQueryParams,
                    page: 1,
                  });
                }}
              />
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
          getUserGroupsWithCurrentQueryParams(delayed, newQueryParamObj);
        }}
      />
    </>
  );
};

export default UserGroupsList;
