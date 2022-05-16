import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StyledActionButton, StyledTableCell, StyledTableRow } from './styled';

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
    <StyledTableRow onClick={() => navigate(navigateLink)}>
      {Object.keys(entity).map((entityParam) => {
        if (entityParamsToShow.some((param) => param === entityParam)) {
          return (
            <StyledTableCell key={entityParam}>
              {entity[entityParam]}
            </StyledTableCell>
          );
        }
        return null;
      })}

      {Boolean(actionsArray.length) && (
        <StyledTableCell>
          {actionsArray.map((action) => (
            <StyledActionButton
              key={action.header}
              disabled={actionLoading}
              onClick={async (e) => {
                await actionHandler(e, action);
              }}
            >
              {action.header}
            </StyledActionButton>
          ))}
        </StyledTableCell>
      )}
    </StyledTableRow>
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
