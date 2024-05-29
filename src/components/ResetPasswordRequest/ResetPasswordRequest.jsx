import styles from './ResetPasswordRequest.module.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FiX } from 'react-icons/fi';

import { IoEye } from 'react-icons/io5';
import { FaEyeSlash } from 'react-icons/fa';

import exclamation from './../../images/exclamation.svg';
import { resetPasswordRequest } from '../../featers/auth/auth';
import { ROUTES } from '../../utils/conts';

const ResetPasswordRequest = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [visibleRepeatPassword, setVisibleRepeatPassword] = useState(false);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });
  const [err, setErr] = useState();

  const onSubmit = (data) => {
    setIsLoading(true);
    setEmail(data.email);
    dispatch(resetPasswordRequest(data)).then((response) => {
      if (response.payload?.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }


      if (response.payload?.response?.status === 500) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }

      if (response.payload?.status === 201) {
        setIsVisibleForm(true);
        setIsLoading(false);
        reset();
      }
    });
  };

  const handleClickResetText = () => {};

  const handleClick = () => {
    navigate(ROUTES.LOGIN);
  };
  return (
    <div className={styles.resetPassword}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Восстановление пароля</h2>
        {!isVisibleForm && (
          <p className={styles.text}>Введите почту и мы вышлем вам письмо для сброса пароля</p>
        )}
        <p className={styles.err}>{err}</p>
        {!isVisibleForm ? (
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.group}>
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
            <button className={styles.button} disabled={!isValid || isLoading}>
              Отправить
            </button>
          </form>
        ) : (
          <div className={styles.card}>
            <p>Информация по восстановлению пароля отправлена на email: {email}</p>

            <p>
              Дождитесь письма и следуйте описанным в нем инструкциям. <br />
              Если вы не получили письмо, попробуйте повторить процедуру восстановления
            </p>
            <button className={styles.button} onClick={handleClick}>
              Понятно
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordRequest;
