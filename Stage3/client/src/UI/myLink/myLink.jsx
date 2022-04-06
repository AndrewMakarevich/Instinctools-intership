import linkStyles from "./myLink.module.css";
import { Link } from "react-router-dom";

const MyLink = (props) => {
  const { className: propClass, ...restProps } = props;

  return (
    <Link className={`${linkStyles["link"]} ${propClass}`} {...restProps}>{props.children}</Link>
  )
};

export default MyLink;