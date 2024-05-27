import Button from '../../UI/button/Button';
import styles from './ChangeCours.module.scss';
import { Controller, useForm } from 'react-hook-form';
import exclamation from './../../../images/exclamation.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeCours, createCours, getCoursOne } from '../../../featers/cours/cours';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactSelect from 'react-select';
import Dropdown from '../DropDown';
import { ROUTES } from '../../../utils/conts';
import ButtonLink from '../../UI/button/ButtonLink';

const options = [
  { value: 'active', label: 'active', color: '#FFC400', isFixed: true },
  { value: 'strawberry', label: 'not active', color: '#00B8D9', isFixed: true },
];

const getValue = (value) => {
  return value ? options.find((option) => option.value === value) : '';
};

const ChangeCours = () => {
  const dispatch = useDispatch();
  const { courdId } = useParams();
  const { cours } = useSelector(({ cours }) => cours);

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
      description: '',
      imgUrl: '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    dispatch(getCoursOne(courdId)).then((response) => {
      setValue('title', response?.payload.title);
      setValue('description', response?.payload.description);
      setValue('imgUrl', response?.payload.imgUrl);
    });
  }, []);

  const onSubmit = (data) => {
    const request = {
      courdId: courdId,
      data: {
        title: data.title,
        description: data.description,
        // status: data.status.value,
        imgUrl: data.imgUrl,
      },
    };
    dispatch(changeCours(request));
  };

  return (
    <div className={styles.changeCours}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{cours.title}</h1>
        <ul className={styles.nav}>
          <NavLink
            to={`${ROUTES.CHANGE_COURS}/${courdId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Параметры курса
          </NavLink>
          <NavLink
            to={`${ROUTES.MODULES_ADMIN}/${courdId}`}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Модули курса
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
              <h3>Описание</h3>
              <input
                type="text"
                {...register('description', {
                  required: 'Поле обязательное к заполнению',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов в имени',
                  },
                })}
              />
              {errors?.description && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.description.message}</p>
                </div>
              )}
            </label>
          </div>
          <div className={styles.input}>
            <label>
              <h3>Картинка</h3>
              <input
                type="text"
                {...register('imgUrl', {
                  required: 'Поле обязательное к заполнению',
                  minLength: {
                    value: 5,
                    message: 'Минимум 5 символов в имени',
                  },
                })}
              />
              {errors?.imgUrl && (
                <div className={styles.exclamation}>
                  <img src={exclamation} />
                  <p>{errors.imgUrl.message}</p>
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

export default ChangeCours;
