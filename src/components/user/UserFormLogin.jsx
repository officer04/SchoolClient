import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { IoEye } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import { FaEyeSlash } from 'react-icons/fa';

import exclamation from './../../images/exclamation.svg';

import { addAuth, addIsNewUser, addUser, getRole, loginUser } from '../../featers/auth/auth';

import styles from './UserFormLogin.module.scss';
import { ROUTES } from '../../utils/conts';
import Button from '../UI/button/Button';

const UserFormLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [err, setErr] = useState('');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let fromPage = location.state?.from?.pathname || ROUTES.ACCOUNT;
  const {
    register,
    reset,
    formState: { errors, isValid},
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(loginUser(data)).then((response) => {
      if (response.payload.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }

      if (response.payload?.status === 200) {
        setIsLoading(false);
        const token = response.payload.data.token;
        const user = jwtDecode(token);
        const userRole = user.role;
        localStorage.setItem('token', token);
        dispatch(addUser(user));
        dispatch(getRole(user.role));
        userRole === 'ADMIN' ? navigate(ROUTES.COURSES_ADMIN) : navigate(fromPage);
      }
    });
  };

  const handleClickVisiblePassword = (e) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  return (
    <section className={styles.signUp}>
      <div className={styles.wrapper}>
        <div className={styles.head}>
          <h1>Добро пожаловать!</h1>
          <p>Войдите, чтобы получить доступ к панели инструментов, настройкам и проектам.</p>
        </div>
        <p className={styles.err}>{err}</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.groupEmail}>
            <label>
              <h3>Электронная почта</h3>
              <div className={styles.inputEmail}>
                <input
                  {...register('email', {
                    required: 'Поля обязательное к заполнению',
                    pattern: {
                      value:
                        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                      message: 'Почта указана не верно',
                    },
                  })}
                />
              </div>

              {errors?.email && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.email.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.groupPassword}>
            <label>
              <h3>Пароль</h3>
              <div className={styles.inputPassword}>
                <input
                  type={!visiblePassword ? 'password' : 'text'}
                  {...register('password', {
                    required: 'Поля обязательное к заполнению',
                    // pattern: {
                    //   value: /^(?=.*\d)\w{3,20}$/m,
                    //   message:
                    //     'Пароль должен состоять из ластинских букв и цифр длина от 3 до 20 символов',
                    // },
                  })}
                />
                {!visiblePassword ? (
                  <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                    <FaEyeSlash color={'black'} size={22} />
                  </button>
                ) : (
                  <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                    <IoEye color={'black'} size={22} />
                  </button>
                )}
              </div>
              {errors?.password && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.password.message}</p>
                </div>
              )}{' '}
            </label>
          </div>
          <div className={styles.resetPassword}>
            <Link to={ROUTES.RESET_PASSWORD_REQUEST}>Забыли пароль?</Link>
          </div>
          <Button disabled={!isValid || isLoading} styleWidth={styles.buttonWidth}>
            Войти
          </Button>
        </form>
        <p className={styles.text}>
          У вас есть аккаунт?{' '}
          <Link to={ROUTES.REGISTRATION}>
            <span>Зарегистрироваться</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default UserFormLogin;
