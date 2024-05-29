import { useDispatch } from 'react-redux';
import styles from './CreateModule.module.scss';
import { useForm } from 'react-hook-form';
import exclamation from '../../../images/exclamation.svg';
import { createCours, createModule, getCourses } from '../../../featers/cours/cours';
import Button from '../../UI/button/Button';
import ButtonLink from '../../UI/button/ButtonLink';
import { ROUTES } from '../../../utils/conts';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const CreateModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { coursId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    setIsLoading(true);
    const request = {
      title: data.title,
      coursId: coursId,
    };
    dispatch(createModule(request)).then((response) => {
      if (response.payload.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }

      if (response.payload?.status === 201) {
        navigate(-1);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className={styles.createCours}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новый модуль курса</h1>
        {err && <p>{err}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.nameCourse}>
            <label>
              <h3>Наименование модуля</h3>
              <input
                type="text"
                placeholder="Введите название модуля"
                {...register('title', {
                  required: 'Поле обязательно к заполнению',
                })}
              />
              {errors?.title && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.title.message}</p>
                </div>
              )}
            </label>
          </div>

          <div className={styles.btnWrapper}>
            <Button styleWidth={styles.btnWidth} onClick={() => navigate(-1)}>
              Отмена
            </Button>
            <Button styleWidth={styles.btnWidth} disabled={!isValid || isLoading}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateModule;
