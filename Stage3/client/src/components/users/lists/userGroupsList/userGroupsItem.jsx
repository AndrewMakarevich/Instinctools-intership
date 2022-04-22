import { useCallback } from 'react';
import useFetching from '../../../../hooks/useFetching';
import UserGroupService from '../../../../service/userGroupService';
import MyButton from '../../../../UI/myButton/myButton';
import listStyles from './userGroupList.module.css';

const UserGroupsItem = ({ group, userId, actualizeUserGroupsList }) => {
  //Deleting user from the group
  const deleteUserFromGroup = useCallback(
    async (groupId) => {
      await UserGroupService.deleteUserFromTheGroup(userId, groupId);
    },
    [userId]
  );

  const {
    executeCallback: sendRequestToDeleteUserFromGroup,
    isLoading: deleteUserFromGroupIsLoading,
  } = useFetching(async (groupId) => await deleteUserFromGroup(groupId));

  const confirmDeleteUserFromGroup = async (e, groupId) => {
    e.stopPropagation();

    if (confirm('Are you sure you want to leave this group?')) {
      await sendRequestToDeleteUserFromGroup(undefined, groupId);
    }

    await actualizeUserGroupsList();
  };

  return (
    <tr
      key={group._id}
      className={listStyles['group-row']}
      onClick={() => navigate(`${groupPaths.mainPath}/${group.groupName}`)}
    >
      <td className={listStyles['group-cell']}>{group.groupName}</td>
      <td className={listStyles['group-cell']}>{group.groupTitle}</td>
      <td className={listStyles['group-cell']}>
        <MyButton
          className={listStyles['delete-user-group-btn']}
          disabled={deleteUserFromGroupIsLoading}
          onClick={async (e) => {
            await confirmDeleteUserFromGroup(e, group._id);
          }}
        >
          Leave this group
        </MyButton>
      </td>
    </tr>
  );
};

export default UserGroupsItem;
