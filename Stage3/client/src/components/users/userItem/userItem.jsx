import PropTypes from 'prop-types';
import MyLink from '../../../UI/myLink/myLink';
import itemStyles from './userItem.module.css';

const UserItem = ({ user }) => (
  <li className={itemStyles['user-item']}>
    <MyLink className={itemStyles['edit-user-link']} to={user.username} />
    <p>
      Username:
      {user.username}
    </p>
    <hr />
    <p>
      Full name:
      {user.firstName}
      {' '}
      {user.lastName}
    </p>
  </li>
);

UserItem.propTypes = {
  user: {
    _id: PropTypes.number,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  },
};

UserItem.defaultProps = {
  user: {
    _id: 0,
    username: '',
    firstName: '',
    lastName: '',
  },
};
export default UserItem;
