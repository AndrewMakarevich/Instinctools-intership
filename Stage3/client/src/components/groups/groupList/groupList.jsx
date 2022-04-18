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
    <article className={listStyles['groups-table-wrapper']}>
      <GroupSearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={queryParams}
        fetchGroups={getUserGroupsWithCurrentQueryParams}
      />
      <table
        className={`${listStyles['groups-table']} ${
          delayedFetchGroupsLoading || fetchGroupsLoading
            ? listStyles.loading
            : ''
        }`}
      >
        <tr>
          <th>Group name</th>
          <th>Group title</th>
        </tr>
        {groupReducer.groups.map((group) => (
          <GroupItem key={group._id} group={group} />
        ))}
      </table>
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
