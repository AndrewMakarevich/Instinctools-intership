import { useNavigate } from 'react-router-dom';
import useFetching from '../../../../hooks/useFetching';
import MyButton from '../../../../UI/myButton/myButton';
import deleteUserFromGroup from '../../../../utils/userGroup/deleteUserFromTheGroup';
import { groupPaths } from '../../../router/routes';
import listStyles from './userGroupList.module.css';

const UserGroupsItem = ({ group, userId, actualizeUserGroupsList }) => {
  const navigate = useNavigate();
  const {
    executeCallback: sendRequestToDeleteUserFromGroup,
    isLoading: deleteUserFromGroupIsLoading,
  } = useFetching(
    async (userId, groupId, actualizeUserGroupsList) =>
      await deleteUserFromGroup(userId, groupId, actualizeUserGroupsList)
  );

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
            e.stopPropagation();
            await sendRequestToDeleteUserFromGroup(
              undefined,
              userId,
              group._id,
              actualizeUserGroupsList
            );
          }}
        >
          Leave this group
        </MyButton>
      </td>
    </tr>
  );
};

export default UserGroupsItem;
