import PropTypes from 'prop-types';
import MyLink from '../../../UI/myLink/myLink';
import itemStyles from './groupItem.module.css';

const GroupItem = ({ group }) => (
  <li key={group._id} className={itemStyles['group-item']}>
    <MyLink className={itemStyles['edit-group-link']} to={group.groupName} />
    <p>
      Group name:
      {group.groupName}
    </p>
    <hr />
    <p>
      Group title:
      {group.groupTitle}
    </p>
  </li>
);

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
