import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../UI/myButton/myButton';
import { userPaths } from '../../router/routes';

import itemStyles from './usersItem.module.css';

const UsersItem = ({
  user,
  groupId = 0,
  actionsArr,
  actualizeGroupUsersList,
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
      className={itemStyles['user-row']}
      onClick={() => navigate(`${userPaths.mainPath}/${user.username}`)}
    >
      <td className={itemStyles['user-cell']}>{user.username}</td>
      <td className={itemStyles['user-cell']}>
        {user.firstName} {user.lastName}
      </td>
      <td className={itemStyles['user-cell']}>{user.email}</td>
      {actionsArr.map((action) => (
        <td className={itemStyles['user-cell']} key={action.header}>
          <MyButton
            data-testid='user-row-action-btn'
            className={itemStyles['delete-group-user-btn']}
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

export default UsersItem;
