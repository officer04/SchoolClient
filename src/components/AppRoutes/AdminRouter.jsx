import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/conts';
import { useSelector } from 'react-redux';

const AdminRouter = () => {
  const location = useLocation();
  const { isAuth, user } = useSelector(({ auth }) => auth);
 
  return isAuth && user.role === "ADMIN" ? <Outlet /> : <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
};

export default AdminRouter;
