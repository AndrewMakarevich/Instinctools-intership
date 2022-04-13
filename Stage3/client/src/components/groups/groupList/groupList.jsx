import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import listStyles from './groupList.module.css';
import { getGroupsThunk } from '../../../store/reducers/groupReducer/actionCreators';
import GroupItem from '../groupItem/groupItem';
import PaginationLine from '../../paginationLine/paginationLine';
import useDelayFetching from '../../../hooks/useDelayFetching';
import GroupSearchPanel from './groupSearchPanel/groupSearchPanel';

const GroupList = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 2,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });
  const dispatch = useDispatch();
  const groupReducer = useSelector((state) => state.groupReducer);
  const getGroups = useCallback(async (queryParamsObj) => {
    await dispatch(getGroupsThunk(queryParamsObj));
  }, []);
  const [fetchGroups, usersAreLoading] = useDelayFetching(getGroups, 200);

  const getUserGroupsWithCurrentQueryParams = (newQueryParamObj) => {
    setQueryParams(newQueryParamObj);
    fetchGroups(undefined, newQueryParamObj);
  };

  useEffect(() => {
    getGroups(queryParams);
  }, []);

  return (
    <article className={listStyles['group-list-wrapper']}>
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        delayFetchGroups={getUserGroupsWithCurrentQueryParams}
      />
      <ul
        className={`${listStyles['group-list']} ${
          usersAreLoading ? listStyles.loading : ''
        }`}
      >
        {groupReducer.groups.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </ul>
      <PaginationLine
        count={groupReducer.count}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={(page) => {
          const newQueryParamsObj = { ...queryParams, page };
          getUserGroupsWithCurrentQueryParams(newQueryParamsObj);
        }}
      />
    </article>
  );
};

export default GroupList;
