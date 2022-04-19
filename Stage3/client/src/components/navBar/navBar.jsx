import publicRoutes from '../router/routes';
import navStyles from './navBar.module.css';
import MyLink from '../../UI/myLink/myLink';

const NavBar = () => (
  <nav className={navStyles['nav-bar']}>
    <ul className={navStyles['links-list']}>
      {publicRoutes &&
        publicRoutes.map(({ id, name, path }) => (
          <li className={navStyles['links-item']} key={id}>
            <MyLink
              className={navStyles.link}
              to={path}
              data-testid={`nav-bar-${name}-link`}
            >
              {name}
            </MyLink>
          </li>
        ))}
    </ul>
  </nav>
);

export default NavBar;
