import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import TableRow from './tableRow';

import tableStyles from './table.module.css';

const Table = ({
  entityParamsToShow,
  thArray,
  actionsArray,
  entitiesArray,
  entitiesLoading,
  navigateLinkLayout,
  actualizeList,
}) => {
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
    <article
      data-testid='table-wrapper'
      className={tableStyles['table-wrapper']}
    >
      <table
        data-testid='table'
        className={`${tableStyles.table} ${
          entitiesLoading ? tableStyles.loading : ''
        }`}
      >
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
              actualizeEntitiesList={actualizeList}
            />
          ))}
        </tbody>
        <tfoot />
      </table>
    </article>
  );
};

Table.propTypes = {
  entityParamsToShow: PropTypes.array,
  thArray: PropTypes.array,
  actionsArray: PropTypes.array,
  entitiesArray: PropTypes.array,
  entitiesLoading: PropTypes.bool,
  navigateLinkLayout: PropTypes.object,
  actualizeList: PropTypes.func,
};

export default Table;
