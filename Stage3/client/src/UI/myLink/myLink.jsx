import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import linkStyles from './myLink.module.css';

const MyLink = ({ className: propClass, children, ...restProps }) => {
  return (
    <Link className={`${linkStyles.link} ${propClass}`} {...restProps}>
      {children}
    </Link>
  );
};

MyLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.any,
};

MyLink.defaultProps = {
  className: '',
  children: '',
};
export default MyLink;
