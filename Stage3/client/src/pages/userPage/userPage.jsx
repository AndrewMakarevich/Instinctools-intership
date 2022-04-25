import pageStyles from './userPage.module.css';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditUserForm from '../../components/users/forms/editUserForm/editUserForm';
import UserGroupsList from '../../components/users/lists/userGroupsList/userGroupsList';
import useFetching from '../../hooks/useFetching';
import { getUserThunk } from '../../store/reducers/userReducer/actionCreators';
import UserGroupsModal from '../../components/users/modals/userGroupsModal/userGroupsModal';

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
  }, [username]);

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
        <section className={pageStyles['edit-user-section']}>
          <p className={pageStyles['edit-user-section-header']}>
            {username} user page
          </p>
          <EditUserForm
            userObj={userReducer.user}
            actualizeUserInfo={fetchUser}
          />
          <UserGroupsModal userId={userReducer.user._id} />
        </section>
      ) : (
        "Can't find user with such username"
      )}
    </article>
  );
};

export default UserPage;
