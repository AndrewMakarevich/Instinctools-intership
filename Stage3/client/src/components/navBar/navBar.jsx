import React from 'react';
import { userPaths, groupPaths } from '../router/routes';
import MyLink from '../../UI/myLink/myLink';

import navStyles from './navBar.module.css';

const NavBar = () => (
  <nav className={navStyles['nav-bar']}>
    <ul className={navStyles['links-list']}>
      <li className={navStyles['links-item']}>
        <MyLink
          data-testid='nav-bar-Users-link'
          className={navStyles.link}
          to={userPaths.mainPath.path}
        >
          {userPaths.mainPath.name}
        </MyLink>
      </li>
      <li className={navStyles['links-item']}>
        <MyLink
          data-testid='nav-bar-Groups-link'
          className={navStyles.link}
          to={groupPaths.mainPath.path}
        >
          {groupPaths.mainPath.name}
        </MyLink>
      </li>
    </ul>
  </nav>
);

export default NavBar;
