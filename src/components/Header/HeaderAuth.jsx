import styles from './Header.module.scss';
import logo from './../../images/logo.svg';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/conts';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, toggleModal } from '../../featers/auth/auth';

const HeaderAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispath = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const logOut = () => {
    localStorage.getItem('token');
    localStorage.removeItem('token');
    dispath(addAuth(false));
    navigate(ROUTES.HOME);
  };
  return (
    <header className={styles.header}>
      <Link to={user.role === 'ADMIN' ? ROUTES.COURSES_ADMIN : ROUTES.ACCOUNT}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
      </Link>
      {user.role === 'ADMIN' ? (
        <div className={styles.menu}>
          <NavLink
            to={ROUTES.COURSES_ADMIN}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Курсы
          </NavLink>
          <NavLink
            to={ROUTES.USER_LIST_ADMIN}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Пользователи
          </NavLink>
        </div>
      ) : (
        <div className={styles.menu}>
          <NavLink
            to={ROUTES.ACCOUNT}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Гланая
          </NavLink>
          <NavLink
            to={ROUTES.LIST_MY_COURS}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Все курсы
          </NavLink>
        </div>
      )}

      <div className={styles.wrapper}>
        {location.pathname !== ROUTES.USER_LIST_ADMIN && (
          <p className={styles.user} onClick={() => dispath(toggleModal(true))}>
            {user.username}
          </p>
        )}

        <p className={styles.logOut} onClick={logOut}>
          Выйти
        </p>
      </div>
    </header>
  );
};

export default HeaderAuth;
