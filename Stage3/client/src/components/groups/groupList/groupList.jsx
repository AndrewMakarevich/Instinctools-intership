import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import listStyles from './groupList.module.css';
import getGroups from '../../../store/reducers/groupReducer/actionCreators';
import GroupItem from '../groupItem/groupItem';
import PaginationLine from '../../paginationLine/paginationLine';
import useDelayFetching from '../../../hooks/useDelayFetching';

const GroupList = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 2,
    filterObject: {},
  });
  const dispatch = useDispatch();
  const groupReducer = useSelector((state) => state.groupReducer);
  const [fetchUsers, usersAreLoading] = useDelayFetching(
    () => dispatch(getGroups(queryParams)),
    200
  );

  useEffect(() => {
    fetchUsers();
  }, [queryParams]);

  return (
    <article className={listStyles['group-list-wrapper']}>
      <ul
        className={`${listStyles['group-list']} ${
          usersAreLoading ? listStyles.loading : ''
        }`}
      >
        {groupReducer.groups.length &&
          groupReducer.groups.map((group) => (
            <GroupItem key={group._id} group={group} />
          ))}
      </ul>
      <PaginationLine
        count={groupReducer.count}
        page={queryParams.page}
        limit={queryParams.limit}
        setPage={(page) => {
          setQueryParams({ ...queryParams, page });
        }}
      />
    </article>
  );
};

export default GroupList;
