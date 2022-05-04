import { useCallback, useEffect, useMemo, useState } from 'react';
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
  actionsArr,
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
    async (delayed, newQueryParamsObj) => {
      setQueryParams(newQueryParamsObj);
      await getUsersFunction(delayed, newQueryParamsObj);
    },
    [setQueryParams, getUsersFunction]
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
    await getUsersListWithCurrentQueryParams(false, clearedQueryParamsObj);
  }, [queryParams, getUsersListWithCurrentQueryParams]);

  const navigateLinkLayout = useMemo(
    () => ({
      mainPath: userPaths.mainPath,
      entityParamNamesInnerPathsBasedOn: ['username'],
    }),
    []
  );

  const setPage = useCallback(
    async (page, delayed) => {
      await getUsersListWithCurrentQueryParams(delayed, {
        ...queryParams,
        page,
      });
    },
    [queryParams, getUsersListWithCurrentQueryParams]
  );

  useEffect(() => {
    getUsersListWithCurrentQueryParams(false, queryParams);
  }, []);

  return (
    <>
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
        actualizeList={async () => await setPage(1, false)}
      />
      <PaginationLine
        count={usersCount}
        limit={queryParams.limit}
        page={queryParams.page}
        setPage={setPage}
      />
    </>
  );
};

UsersList.propTypes = {
  usersArr: PropTypes.array,
  usersCount: PropTypes.number,
  getUsersFunction: PropTypes.func,
  usersLoading: PropTypes.bool,
  actionsArr: PropTypes.array,
};

export default UsersList;
