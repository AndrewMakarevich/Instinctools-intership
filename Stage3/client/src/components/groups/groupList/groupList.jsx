import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import listStyles from './groupList.module.css';
import { getGroupsThunk } from '../../../store/reducers/groupReducer/actionCreators';
import GroupItem from '../groupItem/groupItem';
import PaginationLine from '../../paginationLine/paginationLine';
import useDelayFetching from '../../../hooks/useDelayFetching';
import GroupSearchPanel from './groupSearchPanel/groupSearchPanel';
import useFetching from '../../../hooks/useFetching';

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

  const { executeCallback: fetchGroups, isLoading: fetchGroupsLoading } =
    useFetching(getGroups);
  const [delayedFetchGroups, delayedFetchGroupsLoading] = useDelayFetching(
    getGroups,
    400
  );

  const getUserGroupsWithCurrentQueryParams = async (
    newQueryParamObj,
    delayed
  ) => {
    setQueryParams(newQueryParamObj);

    if (delayed) {
      await delayedFetchGroups(undefined, newQueryParamObj);

      return;
    }

    await fetchGroups(undefined, newQueryParamObj);
  };

  useEffect(() => {
    getUserGroupsWithCurrentQueryParams(queryParams, false);
  }, []);

  return (
    <article className={listStyles['group-list-wrapper']}>
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={queryParams}
        fetchGroups={getUserGroupsWithCurrentQueryParams}
      />
      <ul
        className={`${listStyles['group-list']} ${
          delayedFetchGroupsLoading || fetchGroupsLoading
            ? listStyles.loading
            : ''
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
        setPage={(page, delayed = false) => {
          const newQueryParamsObj = { ...queryParams, page };
          getUserGroupsWithCurrentQueryParams(newQueryParamsObj, delayed);
        }}
      />
    </article>
  );
};

export default GroupList;
