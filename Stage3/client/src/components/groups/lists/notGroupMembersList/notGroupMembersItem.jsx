import { useNavigate } from 'react-router-dom';
import useFetching from '../../../../hooks/useFetching';
import MyButton from '../../../../UI/myButton/myButton';
import addUserToTheGroup from '../../../../utils/userGroup/addUserToTheGroup';
import { userPaths } from '../../../router/routes';
import listStyles from './notGroupMembersList.module.css';

const NotGroupMembersItem = ({ user, groupId, actualizeGroupUsersList }) => {
  const navigate = useNavigate();
  const {
    executeCallback: sendRequestToAddUserToGroup,
    isLoading: addUserToGroupLoading,
  } = useFetching((userId, groupId, actualizeGroupUsersList) =>
    addUserToTheGroup(userId, groupId, actualizeGroupUsersList)
  );
  return (
    <tr
      className={listStyles['user-row']}
      onClick={() => navigate(`${userPaths.mainPath}/${user.username}`)}
    >
      <td className={listStyles['user-cell']}>{user.username}</td>
      <td className={listStyles['user-cell']}>
        {user.firstName} {user.lasName}
      </td>
      <td className={listStyles['user-cell']}>{user.email}</td>
      <td className={listStyles['user-cell']}>
        <MyButton
          disabled={addUserToGroupLoading}
          className={listStyles['add-group-user-btn']}
          onClick={(e) => {
            e.stopPropagation();
            sendRequestToAddUserToGroup(
              undefined,
              user._id,
              groupId,
              actualizeGroupUsersList
            );
          }}
        >
          Add
        </MyButton>
      </td>
    </tr>
  );
};

export default NotGroupMembersItem;
