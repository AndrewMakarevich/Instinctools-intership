import publicRoutes from "../router/routes";
import { Link } from "react-router-dom";
import navStyles from "./navBar.module.css";

const NavBar = () => {
  return (
    <nav>
      NavBar
      <ul>
        {publicRoutes && publicRoutes.map(({ id, name, path }) =>
          <li key={id}><Link to={path}>{name}</Link></li>
        )}
      </ul>
    </nav>
  )
};

export default NavBar;