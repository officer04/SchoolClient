import { useDispatch, useSelector } from 'react-redux';
import styles from './ChooseCours.module.scss';
import CardCours from '../CardCours/CardCours';
import { useEffect } from 'react';
import { createUserCours, getCourses } from '../../../featers/cours/cours';
import CardChooseCours from '../CardChooseCours/CardChooseCours';
import leftCircle from './../../../images/arrow-left-circle.svg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/conts';

const ChooseCours = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector(({ cours }) => cours);
  const { userId } = useParams();
  const  navigate = useNavigate()

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handleCLickAddCours = (coursId) => {
    const userInfoCours = {
      userId: userId,
      coursId: coursId
    }
    dispatch(createUserCours(userInfoCours))
  };

  return (
    <div className={styles.chooseCours}>
       <div onClick={() => navigate(-1)} className={styles.back}>
        <img src={leftCircle} alt="" />
        <p >Назад</p>
      </div>
      <h1 className={styles.title}>Курсы, которые можно выдать пользователю</h1>
      <div className={styles.wrapper}>
        {isLoading ? (
          courses?.map((cours) => (
            <CardChooseCours
              key={cours._id}
              title={cours.title}
              id={cours._id}
              bg={cours.imgUrl}
              description={cours.description}
              handleCLickAddCours={handleCLickAddCours}
            />
          ))
        ) : (
          <h1 className={styles.loading}>Loading....</h1>
        )}
      </div>
    </div>
  );
};

export default ChooseCours;
