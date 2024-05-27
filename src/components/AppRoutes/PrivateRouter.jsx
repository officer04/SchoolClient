import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/conts';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { addAuth, addIsNewUser, addUser } from '../../featers/auth/auth';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const PrivateRouter = () => {
  const location = useLocation();
  const { isAuth, user } = useSelector(({ auth }) => auth);
 
  return isAuth && user.role === "USER" ? <Outlet /> : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
};

export default PrivateRouter;
