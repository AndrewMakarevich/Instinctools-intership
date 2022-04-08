import { Outlet } from 'react-router-dom';
import GroupPage from '../../pages/groupPage/groupPage';
import GroupsPage from '../../pages/groupsPage/groupsPage';
import UserPage from '../../pages/userPage/userPage';
import UsersPage from '../../pages/usersPage/usersPage';

const publicRoutes = [
  {
    id: 0,
    name: 'Users',
    path: '/users',
    Element: Outlet,
    subRoutes: [
      {
        id: 0,
        name: 'Users',
        path: '',
        Element: UsersPage,
      },
      {
        id: 1,
        name: 'User',
        path: ':username',
        Element: UserPage,
      },
    ],
  },
  {
    id: 1,
    name: 'Groups',
    path: '/groups',
    Element: Outlet,
    subRoutes: [
      {
        id: 0,
        name: 'Groups',
        path: '',
        Element: GroupsPage,
      },
      {
        id: 1,
        name: 'Group',
        path: ':groupname',
        Element: GroupPage,
      },
    ],
  },
];

export default publicRoutes;
