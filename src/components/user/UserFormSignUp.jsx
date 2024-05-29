import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './UserFormSignUp.module.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { addUser, createUser } from './../../featers/auth/auth';
import { useSelector, useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { IoEye } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import { FaEyeSlash } from 'react-icons/fa';

import exclamation from './../../images/exclamation.svg';
import { ROUTES } from '../../utils/conts';
import Button from '../UI/button/Button';

const UserFormSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const [err, setErr] = useState('');

  const onSubmit = (data) => {
    setIsLoading(true);

    dispatch(createUser(data)).then((response) => {
      if (response.payload?.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }

      if (response.payload?.status === 201) {
        setIsLoading(false);
        const token = response.payload.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        dispatch(addUser(user));
        // navigate(ROUTES.ACCOUNT);
        navigate(ROUTES.ACCOUNT);
      }
    });
  };

  const handleClickVisiblePassword = (e) => {
    e.preventDefault();
    setVisiblePassword(!visiblePassword);
  };

  const handleClickVisibleRepeatPassword = (e) => {
    e.preventDefault();
    setVisibleRepeatPassword(!visibleRepeatPassword);
  };

  return (
    <section className={styles.signUp}>
      <div className={styles.wrapper}>
        <div className={styles.title}>
          <h1>Добро пожаловать!</h1>
          <p>
            Зарегистрируйтесь, чтобы получить <br /> доступ к панели инструментов, настройкам и
            проектам.
          </p>
        </div>
        <p className={styles.err}>{err}</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.group}>
            <label>
              <h3>Имя</h3>
              <input
                {...register('username', {
                  required: 'Поля обязательное к заполнению',
                })}
              />
              {errors?.username && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.username.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.group}>
            <label>
              <h3>Электронная почта</h3>
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
              {errors?.email && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.email.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.group}>
            <label>
              <h3>Пароль</h3>
              <div className={styles.inputPassword}>
                <input
                  type={!visiblePassword ? 'text' : 'password'}
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
                    <IoEye color={'black'} size={22} />
                  </button>
                ) : (
                  <button className={styles.btnEye} onClick={(e) => handleClickVisiblePassword(e)}>
                    <FaEyeSlash color={'black'} size={22} />
                  </button>
                )}
              </div>

              {errors?.password && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.password.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.group}>
            <label>
              <h3>Повторите пароль</h3>
              <div className={styles.inputPassword}>
                <input
                  type={!visibleRepeatPassword ? 'text' : 'password'}
                  {...register('repeatPassword', {
                    required: 'Поля обязательное к заполнению',
                    validate: (value, formValues) =>
                      value === formValues.password || 'Пароли не совпадают',
                  })}
                />
                {!visibleRepeatPassword ? (
                  <button
                    className={styles.btnEye}
                    onClick={(e) => handleClickVisibleRepeatPassword(e)}
                  >
                    <IoEye color={'black'} size={22} />
                  </button>
                ) : (
                  <button
                    className={styles.btnEye}
                    onClick={(e) => handleClickVisibleRepeatPassword(e)}
                  >
                    <FaEyeSlash color={'black'} size={22} />
                  </button>
                )}
              </div>

              {errors?.repeatPassword && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.repeatPassword.message}</p>
                </div>
              )}
            </label>
          </div>
          <Button disabled={!isValid || isLoading} styleWidth={styles.buttonWidth}>
            Зарегистрироваться
          </Button>
        </form>
        <p className={styles.text}>
          У вас есть аккаунт?{' '}
          <Link to={ROUTES.LOGIN}>
            <span>Войти</span>
          </Link>
        </p>
      </div>
    </section>
  );
};

export default UserFormSignUp;
