import listStyles from './groupUsersList.module.css';
import { useCallback } from 'react';
import useFetching from '../../../../hooks/useFetching';
import UserGroupService from '../../../../service/userGroupService';
import { userPaths } from '../../../router/routes';
import MyButton from '../../../../UI/myButton/myButton';

const GroupUsersItem = ({ user, groupId, actualizeGroupUsersList }) => {
  //Deleting user from the group
  const deleteUserFromGroup = useCallback(
    async (userId) => {
      await UserGroupService.deleteUserFromTheGroup(userId, groupId);
    },
    [groupId]
  );

  const {
    executeCallback: sendRequestToDeleteUserFromGroup,
    isLoading: deleteUserFromGroupIsLoading,
  } = useFetching(async (userId) => await deleteUserFromGroup(userId));

  const confirmDeleteUserFromGroup = async (e, userId) => {
    e.stopPropagation();

    if (confirm('Are you sure you want to delete user fron this group?')) {
      await sendRequestToDeleteUserFromGroup(undefined, userId);
      await actualizeGroupUsersList();
    }
  };
  return (
    <tr
      key={user._id}
      className={listStyles['user-row']}
      onClick={() => navigate(`${userPaths.mainPath}/${user.username}`)}
    >
      <td>{user.username}</td>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
      <td>
        <MyButton
          className={listStyles['delete-group-user-btn']}
          disabled={deleteUserFromGroupIsLoading}
          onClick={async (e) => await confirmDeleteUserFromGroup(e, user._id)}
        >
          Delete user from the group
        </MyButton>
      </td>
    </tr>
  );
};

export default GroupUsersItem;
