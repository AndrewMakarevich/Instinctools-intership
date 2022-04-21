import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import MyLink from '../../../UI/myLink/myLink';
import itemStyles from './userItem.module.css';

const UserItem = ({ user }) => {
  const navigate = useNavigate();
  return (
    <tr
      data-testid='user-row'
      className={itemStyles['user-row']}
      onClick={() => {
        navigate(user.username);
      }}
    >
      <td className={itemStyles['user-param-cell']}>{user.username}</td>
      <td>
        {user.firstName} {user.lastName}
      </td>
      <td>{user.email}</td>
    </tr>
  );
};

UserItem.propTypes = {
  user: PropTypes.object,
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
