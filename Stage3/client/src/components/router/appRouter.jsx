import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import publicRoutes from './routes';

const AppRouter = () => {
  function createRoutes(id, path, Element, subRoutes) {
    if (!subRoutes || !subRoutes.length) {
      return <Route key={id} path={path} element={<Element />} />;
    }

    return (
      <Route key={id} path={path} element={<Element />}>
        {subRoutes.map((subRoute) => createRoutes(
          subRoute.id,
          subRoute.path,
          subRoute.Element,
          subRoute.subRoutes,
        ))}
      </Route>
    );
  }

  return (
    <Routes>
      <Route path='/*' element={<Navigate to='/users' />} />
      {publicRoutes
        && publicRoutes.map(({
          id, path, Element, subRoutes,
        }) => createRoutes(id, path, Element, subRoutes))}
    </Routes>
  );
};

export default AppRouter;
