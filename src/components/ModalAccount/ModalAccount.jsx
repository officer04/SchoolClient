import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FiXSquare } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import exclamation from './../../images/exclamation.svg';
import { IoEye } from 'react-icons/io5';
import { FiX } from 'react-icons/fi';
import { FaEyeSlash } from 'react-icons/fa';
import styles from './ModalAccount.module.scss';
import { addUser, changeUser, getRole, toggleModal } from '../../featers/auth/auth';
import { useState } from 'react';
import Button from '../UI/button/Button';

const ModalAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(({ auth }) => auth);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(true);
  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(true);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      username: user.username,
      email: user.email,
    },
    mode: 'onBlur',
  });
  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(changeUser(data)).then((response) => {
      if (response.payload.response?.status === 400 || response.payload.response?.status === 401) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }

      if (response.payload?.status === 200) {
        const token = response.payload.data.token;
        const user = jwtDecode(token);
        localStorage.setItem('token', token);
        dispatch(addUser(user));
        dispatch(getRole(user.role));
        dispatch(toggleModal(false));
        setIsLoading(false);
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
    <div className={styles.modal}>
      <div className={styles.card}>
        <button className={styles.square} onClick={() => dispatch(toggleModal(false))}>
          <FiXSquare size={30} />
        </button>
        <h3 className={styles.title}>Личный кабинет</h3>
        <p className={styles.err}>{err}</p>
        <form className={styles.info} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <h3>Имя</h3>
            <input
              className={styles.input}
              placeholder="Ввведите новое имя"
              {...register('username', {
                required: 'Поля обязательное к заполнению',
                minLength: {
                  value: 5,
                  message: 'Минимум 5 символов в имени',
                },
              })}
            />
            {errors?.username && (
              <div className={styles.exclamation}>
                <img src={exclamation} />
                <p>{errors.username.message}</p>
              </div>
            )}
          </label>

          <label>
            <h3>Электронная почта</h3>
            <input
              className={styles.input}
              placeholder="Ввведите новый емейл"
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
          <label>
            <h3>Введите ваш новый пароль</h3>
            <div className={styles.inputPassword}>
              <input
                placeholder="Ввведите новый пароль"
                className={styles.input}
                type={!visiblePassword ? 'text' : 'password'}
                {...register('newPassword', {
                  // required: 'Поля обязательное к заполнению',
                  pattern: {
                    // value: /^(?=.*\d)\w{3,20}$/m,
                    // message:
                    //   'Пароль должен состоять из ластинских букв и цифр длина от 3 до 20 символов',
                  },
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

            {errors?.newpassword && (
              <div className={styles.exclamation}>
                <img src={exclamation} />
                <p>{errors.newpassword.message}</p>
              </div>
            )}
          </label>
          <label>
            <h3>Введите ваш пароль</h3>
            <div className={styles.inputPassword}>
              <input
                className={styles.input}
                placeholder="Ввведите новый емейл"
                type={!visibleRepeatPassword ? 'text' : 'password'}
                {...register('password', {
                  required: 'Поля обязательное к заполнению',
                  pattern: {
                    value: /^(?=.*\d)\w{3,20}$/m,
                    // message:
                    //   'Пароль должен состоять из ластинских букв и цифр длина от 3 до 20 символов',
                  },
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

            {errors?.password && (
              <div className={styles.exclamation}>
                <img src={exclamation} />
                <p>{errors.password.message}</p>
              </div>
            )}
          </label>
          <Button disabled={!isValid || isLoading} styleWidth={styles.btnWidth}>
            Сохранить
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalAccount;
