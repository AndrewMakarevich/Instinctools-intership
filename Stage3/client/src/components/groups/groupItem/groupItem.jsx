import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MyLink from '../../../UI/myLink/myLink';
import itemStyles from './groupItem.module.css';

const GroupItem = ({ group }) => {
  const navigate = useNavigate();
  return (
    <tr
      className={itemStyles['group-row']}
      onClick={() => {
        navigate(group.groupName);
      }}
    >
      <td className={itemStyles['group-param-cell']}>{group.groupName}</td>
      <td className={itemStyles['group-param-cell']}>{group.groupTitle}</td>
    </tr>
  );
};

GroupItem.propTypes = {
  group: {
    _id: PropTypes.string,
    groupName: PropTypes.string,
    groupTitle: PropTypes.string,
  },
};

GroupItem.defaultProps = {
  group: {
    _id: null,
    groupName: null,
    groupTitle: null,
  },
};
export default GroupItem;
