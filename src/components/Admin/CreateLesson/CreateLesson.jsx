import { useDispatch } from 'react-redux';
import styles from './CreateLesson.module.scss';
import { useForm } from 'react-hook-form';
import exclamation from '../../../images/exclamation.svg';
import { createCours, createLesson, createModule, getCourses } from '../../../featers/cours/cours';
import Button from '../../UI/button/Button';
import { ROUTES } from '../../../utils/conts';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';

const CreateModule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { moduleId } = useParams();
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
      lessonNumber: data.lessonNumber,
      youtubeVideoId: data.youtubeVideoId,
      moduleId: moduleId,
    };
    dispatch(createLesson(request)).then((response) => {
      if (response.payload.response?.status === 400) {
        setErr(response.payload.response.data.message);
        setIsLoading(false);
        reset();
      }

      if (response.payload?.status === 201) {
        console.log("sdf")
        navigate(-1);
        setIsLoading(false);
      }
    });
  };

  return (
    <div className={styles.createCours}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Новый урок модуля</h1>
        {err && <p>{err}</p>}
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.nameCourse}>
            <label>
              <h3>Наименование урока</h3>
              <input
                type="text"
                placeholder="Введите название урока"
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
          <div className={styles.nameCourse}>
            <label>
              <h3>Номер урока</h3>
              <input
                type="number"
                placeholder="Введите номер урока"
                {...register('lessonNumber', {
                  required: 'Поле обязательно к заполнению',
                })}
              />
              {errors?.lessonNumber && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.title.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.nameCourse}>
            <label>
              <h3>Ссылка на айди видео с ютуба</h3>
              <input
                type="youtubeVideoId"
                placeholder="Введите айди видео с ютуба"
                {...register('youtubeVideoId', {
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
