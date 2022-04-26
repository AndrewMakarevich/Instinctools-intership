import { useNavigate } from 'react-router-dom';
import useFetching from '../../../../hooks/useFetching';
import MyButton from '../../../../UI/myButton/myButton';
import addUserToTheGroup from '../../../../utils/userGroup/addUserToTheGroup';
import { groupPaths } from '../../../router/routes';
import listStyles from './groupsUserNotPartOfList.module.css';

const GroupsUserNotPartOfItem = ({
  group,
  userId,
  actualizeUserGroupsList,
}) => {
  const navigate = useNavigate();
  const {
    executeCallback: sendRequestToAddUserToGroup,
    isLoading: addUserToGroupLoading,
  } = useFetching((userId, groupId, actualizeGroupUsersList) =>
    addUserToTheGroup(userId, groupId, actualizeGroupUsersList)
  );

  return (
    <tr
      className={listStyles['group-row']}
      onClick={() => navigate(`${groupPaths.mainPath}/${group.groupName}`)}
    >
      <td className={listStyles['group-cell']}>{group.groupName}</td>
      <td className={listStyles['group-cell']}>{group.groupTitle}</td>
      <td className={listStyles['group-cell']}>
        <MyButton
          className={listStyles['add-user-group-btn']}
          disabled={addUserToGroupLoading}
          onClick={(e) => {
            e.stopPropagation();
            sendRequestToAddUserToGroup(
              undefined,
              userId,
              group._id,
              actualizeUserGroupsList
            );
          }}
        >
          Enter
        </MyButton>
      </td>
    </tr>
  );
};

export default GroupsUserNotPartOfItem;
