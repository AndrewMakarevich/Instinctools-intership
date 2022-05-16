import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import TableRow from './tableRow';

import { StyledTable, StyledTableWrapper } from './styled';

const Table = ({
  entityParamsToShow,
  thArray,
  actionsArray = [],
  entitiesArray,
  entitiesLoading,
  navigateLinkLayout,
}) => {
  const [actionLoading, setActionLoading] = useState(false);

  const getNavigateLink = useCallback(
    (entity) => {
      const link = `${navigateLinkLayout.mainPath}/${
        entity[navigateLinkLayout.entityParamNameInnerPathBasedOn]
      }`;

      return link;
    },
    [navigateLinkLayout],
  );

  return (
    <StyledTableWrapper>
      <StyledTable isLoading={entitiesLoading}>
        <thead>
          <tr>
            {thArray.map((th) => (
              <th key={th}>{th}</th>
            ))}
            {Boolean(actionsArray.length) && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {entitiesArray.map((entity) => (
            <TableRow
              key={entity._id}
              entity={entity}
              entityParamsToShow={entityParamsToShow}
              actionsArray={actionsArray}
              navigateLink={getNavigateLink(entity)}
              actionLoading={actionLoading}
              setActionLoading={setActionLoading}
            />
          ))}
        </tbody>
        <tfoot />
      </StyledTable>
    </StyledTableWrapper>
  );
};

Table.propTypes = {
  entityParamsToShow: PropTypes.array,
  thArray: PropTypes.array,
  actionsArray: PropTypes.array,
  entitiesArray: PropTypes.array,
  entitiesLoading: PropTypes.bool,
  navigateLinkLayout: PropTypes.object,
};

export default Table;
