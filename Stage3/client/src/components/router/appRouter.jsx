import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import GroupPage from '../../pages/groupPage/groupPage';
import GroupsPage from '../../pages/groupsPage/groupsPage';
import UserPage from '../../pages/userPage/userPage';
import UsersPage from '../../pages/usersPage/usersPage';

const AppRouter = () => (
  <Routes>
    <Route path='/*' element={<Navigate to='/users' />} />

    <Route path='/users'>
      <Route index element={<UsersPage />} />
      <Route path=':username' element={<UserPage />} />
    </Route>

    <Route path='/groups'>
      <Route index element={<GroupsPage />} />
      <Route path=':groupname' element={<GroupPage />} />
    </Route>
  </Routes>
);
export default AppRouter;
