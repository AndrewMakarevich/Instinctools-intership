import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupsList from '../../components/groups/groupsList/groupsList';
import useCombineFetching from '../../hooks/useCombineFetching';
import { getGroupsThunk } from '../../store/reducers/groupReducer/actionCreators';

const GroupsPage = () => {
  const dispatch = useDispatch();
  const groupReducer = useSelector((store) => store.groupReducer);

  const getGroups = useCallback(async (filterObject, page, limit) => {
    await dispatch(getGroupsThunk({ filterObject, page, limit }));
  });

  const [fetchGroups, fetchGroupsLoading, delayedFetchGroupsLoading] =
    useCombineFetching(getGroups);

  const getGroupsWithCurrentQueryParams = async (newQueryParamsObj, event) => {
    if (
      !event ||
      event.target instanceof HTMLButtonElement ||
      event.target instanceof HTMLSelectElement
    ) {
      await fetchGroups(
        false,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit,
      );
    } else {
      await fetchGroups(
        true,
        newQueryParamsObj.filterObject,
        newQueryParamsObj.page,
        newQueryParamsObj.limit,
      );
    }
  };

  return (
    <article data-testid='groups-list-wrapper'>
      <GroupsList
        actionsArr={[]}
        groupsArr={groupReducer.groups}
        groupsCount={groupReducer.count}
        getGroupsFunction={getGroupsWithCurrentQueryParams}
        groupsLoading={fetchGroupsLoading || delayedFetchGroupsLoading}
      />
    </article>
  );
};

export default GroupsPage;
