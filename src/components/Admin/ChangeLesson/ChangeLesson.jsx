import Button from '../../UI/button/Button';
import styles from './ChangeLesson.module.scss';
import { Controller, useForm } from 'react-hook-form';
import exclamation from './../../../images/exclamation.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeCours,
  changeModule,
  createCours,
  getCoursOne,
  getLessonOne,
  getModuleOne,
} from '../../../featers/cours/cours';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../../utils/conts';
import ButtonLink from '../../UI/button/ButtonLink';

const options = [
  { value: 'active', label: 'active', color: '#FFC400', isFixed: true },
  { value: 'strawberry', label: 'not active', color: '#00B8D9', isFixed: true },
];

const getValue = (value) => {
  return value ? options.find((option) => option.value === value) : '';
};

const ChangeLesson = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const { cours, lesson } = useSelector(({ cours }) => cours);

  const {
    register,
    reset,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      title: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    dispatch(getLessonOne(lessonId)).then((response) => {
      console.log(response)
      setValue('title', response?.payload.title);
      setValue('lessonNumber', response?.payload.lessonNumber);
      setValue('youtubeVideoId', response?.payload.youtubeVideoId);

    });
  }, []);

  const onSubmit = (data) => {
    const request = {
      moduleId: lesson.moduleId,
      title: data.title,
      lessonNumber: data.lessonNumber,
      youtubeVideoId: data.youtubeVideoId,
    };
    dispatch(changeModule(request)).then(() => {
      navigate(-1);
    });
  };

  return (
    <div className={styles.changeLesson}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{cours.title}</h1>
        <ul className={styles.nav}>
          <NavLink
            to={`${ROUTES.CHANGE_COURS}/${lesson.coursId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Параметры курса
          </NavLink>
          <NavLink
            to={`${ROUTES.MODULES_ADMIN}/${lesson.coursId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Модули курса
          </NavLink>
          <NavLink
            to={`${ROUTES.CHANGE_MODULE}/${lesson.moduleId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Параметры модуля
          </NavLink>
          <NavLink
            to={`${ROUTES.LESSONS_MODULE_ADMIN}/${lesson.moduleId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Уроки модуля
          </NavLink>
          <NavLink
            to={`${ROUTES.CHANGE_LESSON}/${lessonId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Параметры урока
          </NavLink>
        </ul>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.input}>
            <label>
              <h3>Название</h3>
              <input
                type="text"
                {...register('title', {
                  required: 'Поле обязательное к заполнению',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов в имени',
                  },
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
          <div className={styles.input}>
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
          <div className={styles.input}>
            <label>
              <h3>Ссылка на айди видео с ютуба</h3>
              <input
                type="text"
                placeholder='Введите айди видео с ютуба'
                {...register('youtubeVideoId', {
                  required: 'Поле обязательное к заполнению',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов в имени',
                  },
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
          {/* <div className={styles.controller}>
            <label>
              <h3>Статус</h3>
              <Controller
                control={control}
                name="status"
                rules={{ required: 'Поля обязательно к выбору' }}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <div>
                    <ReactSelect
                      // classNamePrefix="custom-select"
                      options={options}
                      value={getValue(value)}
                      onChange={(newValue) => onChange(newValue)}
                      placeholder="Укажите статус"
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 10,
                        colors: {
                          ...theme.colors,
                          primary25: 'black',
                          neutral30: 'white',
                        },
                      })}
                    />
                    {error && (
                      <div className={styles.exclamation}>
                        <img src={exclamation} />
                        <p>{error.message}</p>
                      </div>
                    )}
                  </div>
                )}
              />
            </label>
          </div> */}

          <div className={styles.btnWrapper}>
            <ButtonLink to={ROUTES.COURSES_ADMIN} disabled={!isValid} styleWidth={styles.btnWidth}>
              Отмена
            </ButtonLink>
            <Button disabled={!isValid} styleWidth={styles.btnWidth}>
              Сохранить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeLesson;
