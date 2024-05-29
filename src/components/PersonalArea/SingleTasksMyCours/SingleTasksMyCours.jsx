import styles from './SingleTasksMyCours.module.scss';
import taskSmall from './../../../images/tasks-small.svg';
import flag from './../../../images/flag.svg';
import CardTasksMyCours from '../CardTasksMyCours/CardTasksMyCours';
import { Link, useParams } from 'react-router-dom';
import { ROUTES } from '../../../utils/conts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import ContentLoader from 'react-content-loader';
import { getCoursModuleLesson } from '../../../featers/cours/cours';

const SingleTasksMyCours = () => {
  const dispatch = useDispatch();
  const { moduleId } = useParams();
  const { lessonsInfo, isLoading } = useSelector(({ cours }) => cours);
  useEffect(() => {
    dispatch(getCoursModuleLesson(moduleId));
  }, []);

  return (
    <div className={styles.singleTasksMyCours}>
      <div className={styles.head}>
        <Link to={ROUTES.LIST_MY_COURS}>Мои курсы / </Link>
        <Link to={`${ROUTES.SINGLE_MY_COURS}/${lessonsInfo.coursInfo?.coursId}`}>
          {lessonsInfo.coursInfo?.title}
        </Link>
        <h1 className={styles.title}>{lessonsInfo.moduleTitle}</h1>
        <div className={styles.subtile}>
          <img src={taskSmall} alt="" />
          <p>{lessonsInfo.progress?.length} из {lessonsInfo.lessons?.length}</p>
          <p>уроков</p>
        </div>
      </div>
      <div className={styles.wrapper}>
        {isLoading
          ? lessonsInfo.lessons?.map((lesson) => (
              <CardTasksMyCours
                key={lesson._id}
                id={lesson._id}
                title={lesson.title}
                progress={lesson.progress}
                img={flag}
              />
            ))
          : new Array(3).fill(0).map((_, index) => (
              <ContentLoader
                key={index}
                speed={2}
                width={1100}
                height={90}
                viewBox="0 0 1100 90"
                backgroundColor="#a8a8a8"
                foregroundColor="#d9d9d9"
              >
                <rect x="0" y="2" rx="4" ry="4" width="1100" height="2" />
                <rect x="0" y="86" rx="4" ry="4" width="1100" height="2" />
                <rect x="13" y="25" rx="10" ry="10" width="56" height="38" />
                <rect x="100" y="35" rx="4" ry="4" width="129" height="20" />
                <rect x="1000" y="40" rx="4" ry="4" width="85" height="15" />
              </ContentLoader>
            ))}
      </div>
    </div>
  );
};

export default SingleTasksMyCours;
