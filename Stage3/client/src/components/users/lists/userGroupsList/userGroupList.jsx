import { useCallback, useEffect, useState } from 'react';
import listStyles from './userGroupList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useDelayFetching from '../../../../hooks/useDelayFetching';
import { getUserGroupsThunk } from '../../../../store/reducers/userGroupReducer/actionCreator';
import GroupSearchPanel from '../../../groups/groupList/groupSearchPanel/groupSearchPanel';
import ModalWindow from '../../../modalWindow/modalWindow';
import PaginationLine from '../../../paginationLine/paginationLine';

const UserGroupList = ({ userId }) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 2,
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
    getUserGroupsList(
      undefined,
      newQueryParamObj.filterObject,
      newQueryParamObj.page,
      newQueryParamObj.limit
    );
  };

  useEffect(() => {
    if (userId) {
      fetchUserGroups(undefined, groupQueryParams.page, groupQueryParams.limit);
    }
  }, [userId]);

  // if (userGroupsLoading) {
  //   return <p>User groups is loading</p>;
  // }

  // if (userGroupsError) {
  //   return <p>{userGroupsError}</p>;
  // }

  return (
    <>
      <button onClick={() => setUserGroupsIsOpen(true)}>User groups</button>
      <ModalWindow isOpen={userGroupsIsOpen} setIsOpen={setUserGroupsIsOpen}>
        <GroupSearchPanel
          paramsMap={['groupName', 'groupTitle']}
          queryParams={groupQueryParams}
          setQueryParams={setGroupQueryParams}
          delayFetchGroups={getUserGroupsWithCurrentQueryParams}
        />
        {userGroupReducer.userGroups.length ? (
          <div
            className={`${listStyles['groups-list__wrapper']} ${
              userGroupsLoading ? listStyles['loading'] : ''
            }`}
          >
            {userGroupReducer.userGroups.map((group) => (
              <div key={group._id}>{group.groupName}</div>
            ))}
          </div>
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
