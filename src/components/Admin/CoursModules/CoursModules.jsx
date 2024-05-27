import { NavLink, useParams } from 'react-router-dom';
import styles from './CoursModules.module.scss';
import { ROUTES } from '../../../utils/conts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  deleteModule,
  getCoursModule,
  getCoursOne,
} from '../../../featers/cours/cours';
import CardCoursCreate from '../CardCoursCreate/CardCoursCreate';
import CardModule from '../CardModules/CardModule';

const CoursModules = () => {
  const dispatch = useDispatch();
  const { isLoading, modules, cours } = useSelector(({ cours }) => cours);
  const { coursId } = useParams();
  useEffect(() => {
    dispatch(getCoursModule(coursId));
    dispatch(getCoursOne(coursId))
  }, []);

  const handleClickDeleteCourse = (e, moduleId) => {
    e.preventDefault();
    dispatch(deleteModule(moduleId)).then((response) => {
      console.log(response);
      if (response.payload?.status === 204) {
        dispatch(getCoursModule(coursId));
      }
    });
  };
  console.log(cours)
  return (
    <div className={styles.coursModules}>
      <h1 className={styles.title}>{isLoading? cours?.data?.title : "Название курса"}</h1>

      <ul className={styles.nav}>
        <NavLink
          to={`${ROUTES.CHANGE_COURS}/${coursId}`}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          Параметры курса
        </NavLink>
        <NavLink
          to={`${ROUTES.MODULES_ADMIN}/${coursId}`}
          className={({ isActive }) => (isActive ? `${styles.link} ${styles.active}` : styles.link)}
        >
          Модули курса
        </NavLink>
      </ul>

      <div className={styles.wrapper}>
        {isLoading ? (
          <>
            <CardCoursCreate
              id={coursId}
              className={styles.card}
              to={`${ROUTES.CREATE_MODULE}/${coursId}`}
            />
            {modules?.map((cours) => (
              <CardModule
                key={cours._id}
                title={cours.title}
                id={cours._id}
                handleClickDeleteCourse={handleClickDeleteCourse}
              />
            ))}
          </>
        ) : (
          <h1 className={styles.loading}>Loading....</h1>
        )}
      </div>
    </div>
  );
};

export default CoursModules;
