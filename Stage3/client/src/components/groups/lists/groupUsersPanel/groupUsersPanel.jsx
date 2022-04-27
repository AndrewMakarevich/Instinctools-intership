import listStyles from './groupUsersPanel.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useCombineFetching from '../../../../hooks/useCombineFetching';
import PaginationLine from '../../../paginationLine/paginationLine';
import GroupUsersPanelListItem from './groupUsersPanelListItem';
import SearchPanel from '../../../searchPanel/searchPanel';

const GroupUsersPanel = ({
  groupId,
  groupUsersStateArrName,
  thunkFunction,
  actionsArr,
}) => {
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
      await dispatch(thunkFunction(groupId, filterObject, page, limit));
    },
    [groupId, thunkFunction]
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

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...userQueryParams,
      filterObject: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
      },
    };
    await getGroupUsersListWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [userQueryParams, getGroupUsersListWithCurrentQueryParams]);

  const actualizeGroupUsersList = () => {
    getGroupUsersListWithCurrentQueryParams(false, {
      ...userQueryParams,
      page: 1,
    });
  };

  const setPage = (pageValue, delayed = false) => {
    const newQueryParamsObj = { ...userQueryParams, page: pageValue };
    getGroupUsersListWithCurrentQueryParams(delayed, newQueryParamsObj);
  };

  useEffect(() => {
    getGroupUsersListWithCurrentQueryParams(false, userQueryParams);
  }, []);

  return (
    <>
      <SearchPanel
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={userQueryParams}
        fetchFunction={getGroupUsersListWithCurrentQueryParams}
        clearFieldsFunction={clearQueryParams}
      />
      {userGroupReducer[groupUsersStateArrName].length ? (
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
              {actionsArr.map((action) => (
                <th key={action.header}>Action</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userGroupReducer[groupUsersStateArrName].map((user) => (
              <GroupUsersPanelListItem
                key={user._id}
                user={user}
                groupId={groupId}
                actualizeGroupUsersList={actualizeGroupUsersList}
                actionsArr={actionsArr}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Can't find users</p>
      )}

      <PaginationLine
        page={userQueryParams.page}
        limit={userQueryParams.limit}
        count={userGroupReducer.count}
        setPage={setPage}
      />
    </>
  );
};

export default GroupUsersPanel;
