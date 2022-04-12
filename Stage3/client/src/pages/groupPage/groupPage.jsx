import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useFetching from '../../hooks/useFetching';
import { getGroupThunk } from '../../store/reducers/groupReducer/actionCreators';
// import pageStyles from './groupPage.module.css';

const GroupPage = () => {
  const { groupname } = useParams();
  const dispatch = useDispatch();
  const groupReducer = useSelector((store) => store.groupReducer);
  const fetchGroup = useCallback(async () => {
    await dispatch(getGroupThunk(groupname));
  }, [groupname]);

  const {
    executeCallback: getGroupByGroupName,
    isLoading: groupIsLoading,
    error: groupError,
  } = useFetching(fetchGroup);

  useEffect(() => {
    getGroupByGroupName();
  }, []);

  if (groupIsLoading) {
    return (
      <article>
        <p>Group is loading</p>
      </article>
    );
  }

  if (groupError) {
    return (
      <article>
        <p>{errorGroup}</p>
      </article>
    );
  }

  return (
    <article>
      {groupReducer.group ? (
        <p>{groupname} group page</p>
      ) : (
        <p>Can't find group with such groupname</p>
      )}
    </article>
  );
};

export default GroupPage;
