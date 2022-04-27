import listStyles from './userGroupsPanel.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../../UI/myButton/myButton';
import { groupPaths } from '../../../router/routes';

const UserGroupsPanelListItem = ({
  group,
  userId,
  actualizeUserGroupsList,
  actionsArr,
}) => {
  const navigate = useNavigate();
  const [actionIsLoading, setActionIsLoading] = useState(false);

  const actionHandler = async (e, action) => {
    e.stopPropagation();
    try {
      setActionIsLoading(true);
      await action.clickHandler(userId, group._id, actualizeUserGroupsList);
    } catch (e) {
      if (e.isAxiosError) {
        alert(e.response.data.message);
        return;
      }

      alert(e.message);
    } finally {
      setActionIsLoading(false);
    }
  };

  return (
    <tr
      key={group._id}
      className={listStyles['group-row']}
      onClick={() => navigate(`${groupPaths.mainPath}/${group.groupName}`)}
    >
      <td className={listStyles['group-cell']}>{group.groupName}</td>
      <td className={listStyles['group-cell']}>{group.groupTitle}</td>
      {actionsArr.map((action) => (
        <td className={listStyles['group-cell']} key={action.header}>
          <MyButton
            className={listStyles['delete-user-group-btn']}
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

export default UserGroupsPanelListItem;
