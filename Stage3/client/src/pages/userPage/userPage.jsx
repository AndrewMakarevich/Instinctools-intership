import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditUserForm from '../../components/users/forms/editUserForm/editUserForm';
import useFetching from '../../hooks/useFetching';
import { getUserThunk } from '../../store/reducers/userReducer/actionCreators';
// import pageStyles from './userPage.module.css';

const UserPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const userReducer = useSelector((store) => store.userReducer);
  const fetchUser = useCallback(async () => {
    await dispatch(getUserThunk(username));
  }, [username]);

  const {
    executeCallback: getUserByUsername,
    isLoading: userIsLoading,
    error: userError,
  } = useFetching(fetchUser);

  useEffect(() => {
    getUserByUsername();
  }, []);

  if (userIsLoading) {
    return (
      <article>
        <p>User is loading</p>
      </article>
    );
  }

  if (userError) {
    return (
      <article>
        <p>Error: {userError}</p>
      </article>
    );
  }

  return (
    <article>
      {userReducer.user ? (
        <>
          <p>{username} user page</p>
          <EditUserForm userObj={userReducer.user} />
        </>
      ) : (
        "Can't find user with such username"
      )}
    </article>
  );
};

export default UserPage;
