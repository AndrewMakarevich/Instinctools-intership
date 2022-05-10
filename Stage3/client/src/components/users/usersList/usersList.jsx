import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { userPaths } from '../../router/routes';
import Table from '../../lists/table/table';
import SearchPanel from '../../searchPanel/searchPanel';
import PaginationLine from '../../paginationLine/paginationLine';

const UsersList = ({
  usersArr,
  usersCount,
  getUsersFunction,
  usersLoading,
  actionsArr = [],
  limit = 10,
}) => {
  const [queryParams, setQueryParams] = useState({
    filterObject: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
    },
    page: 1,
    limit: 10,
  });

  const getUsersListWithCurrentQueryParams = useCallback(
    async (newQueryParamsObj, event) => {
      setQueryParams(newQueryParamsObj);
      await getUsersFunction(newQueryParamsObj, event);
    },
    [setQueryParams, getUsersFunction],
  );

  const clearQueryParams = useCallback(async () => {
    const clearedQueryParamsObj = {
      ...queryParams,
      filterObject: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
      },
    };
    await getUsersListWithCurrentQueryParams(clearedQueryParamsObj);
  }, [queryParams, getUsersListWithCurrentQueryParams]);

  const navigateLinkLayout = useMemo(
    () => ({
      mainPath: userPaths.mainPath.path,
      entityParamNameInnerPathBasedOn: 'username',
    }),
    [],
  );

  const setPage = useCallback(
    async (page, event) => {
      await getUsersListWithCurrentQueryParams(
        {
          ...queryParams,
          page,
        },
        event,
      );
    },
    [queryParams, getUsersListWithCurrentQueryParams],
  );

  useEffect(() => {
    if (limit) {
      setQueryParams({ ...queryParams, limit });
      getUsersListWithCurrentQueryParams({ ...queryParams, limit });
    }
  }, [limit]);

  return (
    <article data-testid='users-list-panel'>
      <SearchPanel
        clearFieldsFunction={clearQueryParams}
        fetchFunction={getUsersListWithCurrentQueryParams}
        paramsMap={['username', 'firstName', 'lastName', 'email']}
        queryParams={queryParams}
      />
      <Table
        actionsArray={actionsArr}
        entitiesArray={usersArr}
        entitiesLoading={usersLoading}
        entityParamsToShow={['username', 'firstName', 'lastName', 'email']}
        navigateLinkLayout={navigateLinkLayout}
        thArray={['Username', 'First name', 'Last name', 'email']}
      />
      <PaginationLine
        count={usersCount}
        limit={queryParams.limit}
        page={queryParams.page}
        setPage={setPage}
      />
    </article>
  );
};

UsersList.propTypes = {
  usersArr: PropTypes.array,
  usersCount: PropTypes.number,
  getUsersFunction: PropTypes.func,
  usersLoading: PropTypes.bool,
  actionsArr: PropTypes.array,
  limit: PropTypes.number,
};

export default UsersList;
