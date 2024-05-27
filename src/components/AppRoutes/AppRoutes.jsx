import { Route, Routes } from 'react-router-dom';
import { adminRoutes, authRoutes, publicRoutes } from '../../routes';

import PrivateRouter from './PrivateRouter';
import NotfoundPage from '../NotfoundPage/NotfoundPage';
import AdminRouter from './AdminRouter';

const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={Component} />
      ))}
      <Route element={<PrivateRouter />}>
        {authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Route>
      <Route element={<AdminRouter />}>
        {adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={Component} />
        ))}
      </Route>
      <Route path="*" element={<NotfoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
