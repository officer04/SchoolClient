import { Link } from 'react-router-dom';
import CardCours from '../CardCours/CardCours';
import styles from './Courses.module.scss';
import { FaPlus } from 'react-icons/fa';
import { ROUTES } from '../../../utils/conts';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCours, getCours, getCourses } from '../../../featers/cours/cours';
import { useEffect } from 'react';
import CardMyCours from '../../PersonalArea/CardMyCours/CardMyCours';
import ModalAccount from '../../ModalAccount/ModalAccount';

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector(({ cours }) => cours);
  const { isModalAccount } = useSelector(({ auth }) => auth);
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleClickDeleteCourse = (e, id) => {
    e.preventDefault();
    dispatch(deleteCours(id)).then((response) => {
      if (response.payload?.status === 204) {
        dispatch(getCourses());
      }
    });
  };
  return (
    <div className={styles.courses}>
      {isModalAccount && <ModalAccount />}
      <h1 className={styles.title}>Все курсы, которое будут на сайте</h1>
      <div className={styles.wrapper}>
        {isLoading ? (
          <>
            <Link to={ROUTES.CREATE_COURS} className={styles.card}>
              <FaPlus size={40} color="white" />
            </Link>
            {courses?.map((cours) => (
              <CardCours
                key={cours._id}
                title={cours.title}
                id={cours._id}
                bg={cours.imgUrl}
                description={cours.description}
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

export default Courses;
