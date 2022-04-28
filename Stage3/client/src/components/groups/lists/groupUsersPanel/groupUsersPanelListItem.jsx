import listStyles from './groupUsersPanel.module.css';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../../UI/myButton/myButton';
import { useState } from 'react';
import { userPaths } from '../../../router/routes';

const GroupUsersPanelListItem = ({
  user,
  groupId,
  actualizeGroupUsersList,
  actionsArr,
}) => {
  const navigate = useNavigate();
  const [actionIsLoading, setActionIsLoading] = useState(false);

  const actionHandler = async (e, action) => {
    try {
      e.stopPropagation();
      setActionIsLoading(true);
      await action.clickHandler(user._id, groupId, actualizeGroupUsersList);
    } catch (e) {
      if (e.isAxiosError) {
        alert(e.response.data.message);
        return;
      }

      alert(e.message);
      return;
    } finally {
      setActionIsLoading(false);
    }
  };

  return (
    <tr
      data-testid='group-users-row'
      key={user._id}
      className={listStyles['user-row']}
      onClick={() => navigate(`${userPaths.mainPath}/${user.username}`)}
    >
      <td className={listStyles['user-cell']}>{user.username}</td>
      <td className={listStyles['user-cell']}>
        {user.firstName} {user.lastName}
      </td>
      <td className={listStyles['user-cell']}>{user.email}</td>
      {actionsArr.map((action) => (
        <td className={listStyles['user-cell']} key={action.header}>
          <MyButton
            data-testid='user-row-action-btn'
            className={listStyles['delete-group-user-btn']}
            disabled={actionIsLoading}
            onClick={async (e) => await actionHandler(e, action)}
          >
            {action.header}
          </MyButton>
        </td>
      ))}
    </tr>
  );
};

export default GroupUsersPanelListItem;
