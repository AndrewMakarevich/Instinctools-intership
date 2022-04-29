import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../../UI/myButton/myButton';
import { groupPaths } from '../../router/routes';

import itemStyles from './groupsItem.module.css';

const GroupsItem = ({ group, userId = 0, actionsArr, actualizeGroupsList }) => {
  const navigate = useNavigate();
  const [actionIsLoading, setActionIsLoading] = useState(false);

  const actionHandler = async (e, action) => {
    e.stopPropagation();
    try {
      setActionIsLoading(true);
      await action.clickHandler(userId, group._id, actualizeGroupsList);
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
      data-testid='user-groups-row'
      key={group._id}
      className={itemStyles['group-row']}
      onClick={() => navigate(`${groupPaths.mainPath}/${group.groupName}`)}
    >
      <td className={itemStyles['group-cell']}>{group.groupName}</td>
      <td className={itemStyles['group-cell']}>{group.groupTitle}</td>
      {actionsArr.map((action) => (
        <td className={itemStyles['group-cell']} key={action.header}>
          <MyButton
            data-testid='group-row-action-btn'
            className={itemStyles['delete-user-group-btn']}
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
export default GroupsItem;
