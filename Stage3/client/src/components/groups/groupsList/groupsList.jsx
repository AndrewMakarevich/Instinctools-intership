import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Table from '../../lists/table/table';
import { groupPaths } from '../../router/routes';
import SearchPanel from '../../searchPanel/searchPanel';
import PaginationLine from '../../paginationLine/paginationLine';

const GroupsList = ({
  groupsArr,
  groupsCount,
  getGroupsFunction,
  groupsLoading,
  actionsArr = [],
  limit = 10,
}) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 10,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });

  const getGroupsWithCurrentQueryParams = useCallback(
    async (newQueryParamsObj, event) => {
      setGroupQueryParams(newQueryParamsObj);
      await getGroupsFunction(newQueryParamsObj, event);
    },
    [setGroupQueryParams, getGroupsFunction],
  );

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...groupQueryParams,
      filterObject: {
        groupName: '',
        groupTitle: '',
      },
    };
    await getGroupsWithCurrentQueryParams(clearedQueryParamsObj);
  }, [groupQueryParams, getGroupsWithCurrentQueryParams]);

  const setPage = useCallback(
    async (page, event) => {
      await getGroupsWithCurrentQueryParams(
        {
          ...groupQueryParams,
          page,
        },
        event,
      );
    },
    [groupQueryParams, getGroupsWithCurrentQueryParams],
  );

  useEffect(() => {
    if (limit) {
      setGroupQueryParams({ ...groupQueryParams, limit });
      getGroupsWithCurrentQueryParams({ ...groupQueryParams, limit });
    }
  }, [limit]);

  const navigateLinkLayout = useMemo(
    () => ({
      mainPath: groupPaths.mainPath.path,
      entityParamNameInnerPathBasedOn: 'groupName',
    }),
    [],
  );

  return (
    <article data-testid='groups-list-panel'>
      <SearchPanel
        clearFieldsFunction={clearQueryParams}
        paramsMap={['groupName', 'groupTitle']}
        queryParams={groupQueryParams}
        fetchFunction={getGroupsWithCurrentQueryParams}
      />
      <Table
        actionsArray={actionsArr}
        entitiesArray={groupsArr}
        entitiesLoading={groupsLoading}
        entityParamsToShow={['groupName', 'groupTitle']}
        navigateLinkLayout={navigateLinkLayout}
        thArray={['Group name', 'GroupTitle']}
      />
      <PaginationLine
        count={groupsCount}
        limit={groupQueryParams.limit}
        page={groupQueryParams.page}
        setPage={setPage}
      />
    </article>
  );
};

GroupsList.propTypes = {
  groupsArr: PropTypes.array,
  groupsCount: PropTypes.number,
  getGroupsFunction: PropTypes.func,
  groupsLoading: PropTypes.bool,
  actionsArr: PropTypes.array,
  limit: PropTypes.number,
};

export default GroupsList;
