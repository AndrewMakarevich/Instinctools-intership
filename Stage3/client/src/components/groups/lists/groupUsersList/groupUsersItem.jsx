import listStyles from './groupUsersList.module.css';
import useFetching from '../../../../hooks/useFetching';
import { userPaths } from '../../../router/routes';
import MyButton from '../../../../UI/myButton/myButton';
import deleteUserFromGroup from '../../../../utils/userGroup/deleteUserFromTheGroup';
import { useNavigate } from 'react-router-dom';

const GroupUsersItem = ({ user, groupId, actualizeGroupUsersList }) => {
  const navigate = useNavigate();
  const {
    executeCallback: sendRequestToDeleteUserFromGroup,
    isLoading: deleteUserFromGroupIsLoading,
  } = useFetching(
    async (userId, groupId, actualizeGroupUsersList) =>
      await deleteUserFromGroup(userId, groupId, actualizeGroupUsersList)
  );

  return (
    <tr
      key={user._id}
      className={listStyles['user-row']}
      onClick={() => navigate(`${userPaths.mainPath}/${user.username}`)}
    >
      <td className={listStyles['user-cell']}>{user.username}</td>
      <td className={listStyles['user-cell']}>
        {user.firstName} {user.lastName}
      </td>
      <td className={listStyles['user-cell']}>{user.email}</td>
      <td className={listStyles['user-cell']}>
        <MyButton
          className={listStyles['delete-group-user-btn']}
          disabled={deleteUserFromGroupIsLoading}
          onClick={async (e) => {
            e.stopPropagation();
            await sendRequestToDeleteUserFromGroup(
              undefined,
              user._id,
              groupId,
              actualizeGroupUsersList
            );
          }}
        >
          Delete user from the group
        </MyButton>
      </td>
    </tr>
  );
};

export default GroupUsersItem;
