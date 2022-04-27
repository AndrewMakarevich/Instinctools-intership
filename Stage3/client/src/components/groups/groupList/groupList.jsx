import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import listStyles from './groupList.module.css';
import { getGroupsThunk } from '../../../store/reducers/groupReducer/actionCreators';
import GroupItem from '../groupItem/groupItem';
import PaginationLine from '../../paginationLine/paginationLine';
import useCombineFetching from '../../../hooks/useCombineFetching';
import SearchPanel from '../../searchPanel/searchPanel';

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

  const [fetchGroups, fetchGroupsLoading, delayedFetchGroupsLoading] =
    useCombineFetching(getGroups);

  const getUserGroupsWithCurrentQueryParams = async (
    delayed,
    newQueryParamObj
  ) => {
    setQueryParams(newQueryParamObj);
    await fetchGroups(delayed, newQueryParamObj);
  };

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...queryParams,
      filterObject: {
        groupName: '',
        groupTitle: '',
      },
    };
    await getUserGroupsWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [queryParams, getUserGroupsWithCurrentQueryParams]);

  useEffect(() => {
    getUserGroupsWithCurrentQueryParams(false, queryParams);
  }, []);

  return (
    <article
      data-testid='groups-table-wrapper'
      className={listStyles['groups-table-wrapper']}
    >
      <SearchPanel
        paramsMap={['groupName', 'groupTitle']}
        queryParams={queryParams}
        fetchFunction={getUserGroupsWithCurrentQueryParams}
        clearFieldsFunction={clearQueryParams}
      />
      <table
        data-testid='groups-table'
        className={`${listStyles['groups-table']} ${
          delayedFetchGroupsLoading || fetchGroupsLoading
            ? listStyles.loading
            : ''
        }`}
      >
        <thead>
          <tr>
            <th>Group name</th>
            <th>Group title</th>
          </tr>
        </thead>
        <tbody>
          {groupReducer.groups.map((group) => (
            <GroupItem key={group._id} group={group} />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
      <PaginationLine
        count={groupReducer.count}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={(page, delayed = false) => {
          const newQueryParamsObj = { ...queryParams, page };
          getUserGroupsWithCurrentQueryParams(delayed, newQueryParamsObj);
        }}
      />
    </article>
  );
};

export default GroupList;
