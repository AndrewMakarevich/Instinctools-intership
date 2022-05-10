import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import MyButton from '../../../UI/myButton/myButton';

import tableStyles from './table.module.css';

const TableRow = ({
  entity,
  entityParamsToShow,
  actionsArray,
  navigateLink,
  actionLoading,
  setActionLoading,
}) => {
  const navigate = useNavigate();

  const actionHandler = async (e, action) => {
    e.stopPropagation();
    try {
      setActionLoading(true);
      await action.clickHandler(entity);
    } catch (error) {
      if (error.isAxiosError) {
        alert(error.response.data.message);
        return;
      }

      alert(error.message);
    } finally {
      setActionLoading(false);
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
        return null;
      })}

      {Boolean(actionsArray.length) && (
        <td className={tableStyles['table-cell']}>
          {actionsArray.map((action) => (
            <MyButton
              key={action.header}
              data-testid='group-row-action-btn'
              className={tableStyles['action-cell-btn']}
              disabled={actionLoading}
              onClick={async (e) => {
                await actionHandler(e, action);
              }}
            >
              {action.header}
            </MyButton>
          ))}
        </td>
      )}
    </tr>
  );
};

TableRow.propTypes = {
  entity: PropTypes.object,
  entityParamsToShow: PropTypes.array,
  actionsArray: PropTypes.array,
  navigateLink: PropTypes.string,
  actionLoading: PropTypes.bool,
  setActionLoading: PropTypes.func,
};

export default TableRow;
