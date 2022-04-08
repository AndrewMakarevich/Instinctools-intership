import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import linkStyles from './myLink.module.css';

const MyLink = (props) => {
  const { className: propClass, ...restProps } = props;

  return (
    <Link className={`${linkStyles.link} ${propClass}`} {...restProps}>{props.children}</Link>
  );
};
MyLink.propTypes = {
  props: PropTypes.objectOf(PropTypes.object()),
};

MyLink.defaultProps = {
  props: {},
};
export default MyLink;
