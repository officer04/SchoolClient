import { useEffect } from 'react';
import { ROUTES } from '../../../utils/conts';
import styles from './CardLearnMyCours.module.scss';

import { Link } from 'react-router-dom';
import { getCoursModuleLesson } from '../../../featers/cours/cours';
import { useDispatch, useSelector } from 'react-redux';

const CardLearnMyCours = ({ title, id }) => {
  const dispatch = useDispatch();
  const { lessonsInfo } = useSelector(({ cours }) => cours);
  // useEffect(() => {
  //   dispatch(getCoursModuleLesson(id));
  // }, [lessonsInfo.progressTrue?.length]);
  return (
    <Link to={`${ROUTES.SINGLE_MY_COURS_TASK}/${id}`} className={styles.cardLearnMyCours}>
      <div className={styles.wrapper}>
        <h3>{title}</h3>
        <div>
          {/* <p>{lessonsInfo.progress?.length === "0"? 0 : Math.floor(Number(lessonsInfo.progress?.length) / Number(lessonsInfo.lessons?.length))}%</p> */}
          {/* <p>{lessonsInfo.progress?.length} из {lessonsInfo.lessons?.length}</p> */}
          <div className={styles.prograss} />
        </div>
      </div>
    </Link>
  );
};

export default CardLearnMyCours;
