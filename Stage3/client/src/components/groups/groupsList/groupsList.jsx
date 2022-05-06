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
  actionsArr,
}) => {
  const [groupQueryParams, setGroupQueryParams] = useState({
    page: 1,
    limit: 2,
    filterObject: {
      groupName: '',
      groupTitle: '',
    },
  });

  const getGroupsWithCurrentQueryParams = useCallback(
    async (delayed, newQueryParamsObj) => {
      setGroupQueryParams(newQueryParamsObj);
      await getGroupsFunction(delayed, newQueryParamsObj);
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
    await getGroupsWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [groupQueryParams, getGroupsWithCurrentQueryParams]);

  const setPage = useCallback(
    async (page, delayed) => {
      await getGroupsWithCurrentQueryParams(delayed, {
        ...groupQueryParams,
        page,
      });
    },
    [groupQueryParams, getGroupsWithCurrentQueryParams],
  );

  useEffect(() => {
    getGroupsWithCurrentQueryParams(false, groupQueryParams);
  }, []);

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
        actualizeList={async () => {
          await setPage(1, false);
        }}
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
};

export default GroupsList;
