import styles from './TaskMyCours.module.scss';
import arrowLeft from './../../../images/arrow-left.svg';
import arrowRight from './../../../images/arrow-right.svg';

import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/conts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLessonOne } from '../../../featers/cours/cours';

const TaskMyCours = () => {
  const dispatch = useDispatch();
  const { lessonId } = useParams();
  const { lesson, isLoading } = useSelector(({ cours }) => cours);
  useEffect(() => {
    dispatch(getLessonOne(lessonId));
  }, []);

  console.log(lesson);
  const youtubeUrl = 'https://www.youtube.com/embed/';
  return (
    <div className={styles.taskMyCours}>
      <div className={styles.head}>
        <Link to={ROUTES.LIST_MY_COURS}>Мои курсы /</Link>
        <Link to={`${ROUTES.SINGLE_MY_COURS}/${lesson.coursId}`}> {lesson.coursTitle} </Link>
        <Link to={`${ROUTES.SINGLE_MY_COURS_TASK}/${lesson.moduleId}`}>
          / {lesson.moduleTitle}
        </Link>
        <h1 className={styles.title}>{lesson.title}</h1>
      </div>
      <div className={styles.navigate}>
        <div className={styles.btnBack}>
          <img src={arrowLeft} alt="" />
          <button>Предыдущий урок</button>
        </div>
        <div className={styles.btnNext}>
          <button>Следующий урок</button>
          <img src={arrowRight} alt="" />
        </div>
      </div>
      {!isLoading ? (
        <h3 className={styles.loading}>Loading....</h3>
      ) : (
        <iframe
          width="1100"
          height="535"
          src={`${youtubeUrl}${lesson.youtubeVideoId}`}
          title="Полный Full Stack курс ReactJS + NodeJS для начинающих за 4 часа! (MongoDB, Express, React, NodeJS)"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default TaskMyCours;
