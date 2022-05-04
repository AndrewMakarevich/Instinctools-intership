import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../../UI/myButton/myButton';

import tableStyles from './table.module.css';

const TableRow = ({
  entity,
  entityParamsToShow,
  actionsArray,
  navigateLink,
  actualizeEntitiesList,
}) => {
  const navigate = useNavigate();
  const [actionIsLoading, setActionIsLoading] = useState(false);

  const actionHandler = async (e, action) => {
    e.stopPropagation();
    try {
      setActionIsLoading(true);
      await action.clickHandler(entity._id, actualizeEntitiesList);
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
      data-testid='table-row'
      key={entity._id}
      className={tableStyles['table-row']}
      onClick={() => navigate(navigateLink)}
    >
      {Object.keys(entity).map((entityParam) => {
        if (entityParamsToShow.some((param) => param === entityParam)) {
          return (
            <td key={entityParam} className={tableStyles['table-cell']}>
              {entity[entityParam]}
            </td>
          );
        }
      })}

      {actionsArray.map((action) => (
        <td className={tableStyles['table-cell']} key={action.header}>
          <MyButton
            data-testid='group-row-action-btn'
            className={tableStyles['action-cell-btn']}
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

TableRow.propTypes = {
  entity: PropTypes.object,
  entityParamsToShow: PropTypes.array,
  actionsArray: PropTypes.array,
  navigateLink: PropTypes.string,
  actualizeEntitiesList: PropTypes.func,
};

export default TableRow;
